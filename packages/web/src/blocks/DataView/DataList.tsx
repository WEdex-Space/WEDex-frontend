import { message, UPagination } from '@wedex/components'
import { defineComponent, ref, inject, Ref, onBeforeUnmount, watch } from 'vue'
import {
  default as TradingDataList,
  TradingDataItem,
  getControlSlotFilterValue
} from '@/components/TradingDataList'
import { usePair } from '@/hooks'
import { DataListParamsKey, DataListParamsType } from '@/pages/index'
import { services } from '@/services'
import type { ApiDocuments } from '@/services/a2s.namespace'
import { useSocketStore } from '@/stores'
import { updatePairListWithSocketData } from '@/utils/trading'

export default defineComponent({
  name: 'DataList',
  setup() {
    const Pair = usePair()
    const SocketStore = useSocketStore()
    const DataListParams = inject<DataListParamsType>(DataListParamsKey)
    const currentExpand = inject<Ref<'left' | 'center' | 'right'>>('currentExpand')

    const loopSwitchSortValue = (sortType: string) => {
      if (DataListParams) {
        const valueArray = ['down', 'up', null]
        const currentValue = valueArray.indexOf(
          getControlSlotFilterValue(sortType, DataListParams.sortMethod)
        )
        if (currentValue !== -1) {
          const nextIndex =
            currentValue + 1 >= valueArray.length
              ? currentValue + 1 - valueArray.length
              : currentValue + 1
          const nextMethod = nextIndex === 2 ? undefined : `${sortType}-${valueArray[nextIndex]}`
          DataListParams.sortMethod = nextMethod
        }
      }
    }

    const dataList = ref<TradingDataItem[]>([])

    const queryParam = ref<{
      page?: number
      size?: number
      chainIds?: number[]
      dexs?: string[]
      keyword?: string
      liquidityMax?: number
      liquidityMin?: number
      pairAgeMax?: number
      pairAgeMin?: number
      rankBy?: string
      rankType?: number
      timeInterval?: string
      trendMax?: number
      trendMin?: number
      txnsMax?: number
      txnsMin?: number
      volumeMax?: number
      volumeMin?: number
    }>({
      page: 1,
      size: 50
    })

    const totalPage = ref(0)

    const fetchData = async function () {
      const { error, data } = await services['Pair@get-pair-list'](queryParam.value)
      if (!error) {
        dataList.value = updatePairListWithSocketData(
          data.list.map((item: ApiDocuments.proto_PairBasicResponse, index: number) => {
            const dexSort: any[] = [item.tokenW0Info, item.tokenW1Info]
            const pairs = [item.tokenW0 || '', item.tokenW1 || ''].map(
              (contractAddress: string) => {
                const targetIndex = dexSort.findIndex(
                  item => item.contractAddress === contractAddress
                )
                return targetIndex !== -1 ? dexSort[targetIndex] : {}
              }
            )
            return {
              pairReportIM: item.pairReportIM,
              dex: item.dex,
              network: item.network,
              id: item._id || '--',
              index,
              tokenPair: pairs,
              Liquidity: item.pairReportIM?.liquidity,
              FDV: item.pairReportIM?.fdv,
              MKTCap: item.pairReportIM?.mktCap,
              createdAt: item.createdAt ? item.createdAt * 1000 : 0
            }
          }),
          undefined,
          DataListParams?.timeInterval
        )

        totalPage.value = data.total
      }
    }

    watch(
      () => dataList.value,
      (newList, prevList) => {
        console.warn('watch dataList', newList, prevList)
        // socket subscribe
        SocketStore.init().then(socket => {
          const newPairs = newList.filter(
            newItem => (prevList || []).map(e => e.id).indexOf(newItem.id) === -1
          )
          if (newPairs.length) {
            SocketStore.subscribe(
              'trade-pair',
              newPairs.map(item => item.id),
              msg => {
                console.log('subscribe trade-pair', msg)
                dataList.value = updatePairListWithSocketData(
                  dataList.value,
                  msg.data.value,
                  DataListParams?.timeInterval
                )
              }
            )
          }
          const oldPairs = (prevList || []).filter(
            oldItem => newList.map(e => e.id).indexOf(oldItem.id) === -1
          )
          if (oldPairs.length) {
            SocketStore.unsubscribe(
              'trade-pair',
              oldPairs.map(item => item.id)
            )
          }
        })
      }
    )

    // init
    fetchData()

    // Pagination
    watch(() => queryParam.value, fetchData)

    onBeforeUnmount(() => {
      SocketStore.unsubscribe('trade-pair', [])
    })

    const handleRowClick = (row: any) => {
      console.log('handleRowClick', row, currentExpand)
      if (row.pairReportIM) {
        currentExpand && (currentExpand.value = 'center')
        Pair.setCurrent(row)
      } else {
        message.warning('data not ready')
      }
    }

    return {
      queryParam,
      totalPage,
      currentExpand,
      dataList,
      DataListParams,
      loopSwitchSortValue,
      handleRowClick
    }
  },
  render() {
    return (
      <div class="flex flex-col">
        <TradingDataList
          class="flex-1"
          isStretch={this.currentExpand === 'left'}
          dataList={this.dataList}
          onSortSwitch={this.loopSwitchSortValue}
          onRowClick={row => {
            this.handleRowClick(row)
          }}
        />
        {this.DataListParams && !this.DataListParams.disablePaginate && (
          <UPagination
            v-model:page={this.queryParam.page}
            pageCount={this.totalPage}
            style={{ margin: '10px auto' }}
          />
        )}
      </div>
    )
  }
})
