import { message, UPagination, loadingBar } from '@wedex/components'
import { defineComponent, ref, inject, Ref, onBeforeUnmount, watch } from 'vue'
import {
  default as TradingDataList,
  TradingDataItem,
  getSortControlValueBySortType
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

    const loopSwitchSortValue = (finnalSortBy: string) => {
      if (DataListParams) {
        const valueArray = ['down', 'up', null]
        const currentValue = valueArray.indexOf(
          getSortControlValueBySortType(
            DataListParams.sortBy === finnalSortBy ? DataListParams.sortType : undefined
          )
        )
        if (currentValue !== -1) {
          const nextIndex =
            currentValue + 1 >= valueArray.length
              ? currentValue + 1 - valueArray.length
              : currentValue + 1
          DataListParams.sortBy = nextIndex === 2 ? undefined : finnalSortBy
          DataListParams.sortType = [-1, 1, undefined][nextIndex]
        }
      }
    }

    const dataList = ref<TradingDataItem[]>([])
    const loading = ref(false)
    const totalPage = ref(0)

    const fetchData = async function () {
      loading.value = true
      const finnalParams = {
        ...DataListParams,
        ranks: [
          {
            rankBy: DataListParams?.rankBy,
            rankType: DataListParams?.rankType
          },
          ...(DataListParams?.sortBy && DataListParams.sortType
            ? [
                {
                  rankBy: DataListParams.sortBy,
                  rankType: DataListParams.sortType
                }
              ]
            : [])
        ]
      }
      const { error, data } = await services['Pair@get-pair-list'](finnalParams)
      loading.value = false

      if (!error) {
        dataList.value = Array.isArray(data.list)
          ? updatePairListWithSocketData(
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
                  id: item.id || '',
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
          : []

        totalPage.value = data.total
      }
    }

    watch(
      () => dataList.value,
      (newList, prevList) => {
        console.warn('pairList', newList, prevList)
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

    // init && Pagination
    watch(
      () => DataListParams,
      () => {
        if (DataListParams) {
          if (loading.value) {
            console.warn('list is loading')
          } else {
            fetchData()
          }
        }
      },
      {
        immediate: true,
        deep: true
      }
    )

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

    // loading bar
    watch(
      () => loading.value,
      value => {
        if (value) {
          loadingBar.start()
        } else {
          loadingBar.finish()
        }
      },
      {
        immediate: true
      }
    )

    return {
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
            v-model:page={this.DataListParams.page}
            pageCount={this.totalPage}
            style={{ margin: '10px auto' }}
          />
        )}
      </div>
    )
  }
})
