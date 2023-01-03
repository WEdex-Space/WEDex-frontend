import { defineComponent, ref, inject, Ref, onBeforeUnmount, watch } from 'vue'
import { updatePairListWithSocketData } from './util'
import { default as TradingDataList, TradingDataItem } from '@/components/TradingDataList'
import { ControlSlotValueType } from '@/components/TradingDataList/ControlSlot'
import { usePair } from '@/hooks'
import { DataListParamsKey } from '@/pages/index'
import { services } from '@/services'
import type { ApiDocuments } from '@/services/a2s.namespace'
import { useSocketStore } from '@/stores'

const getControlSlotFilterValue = (sortMethod: string | null, sortType: string) => {
  const arr = sortMethod?.split('-') || []
  return (arr.length === 2 && arr[0] === sortType ? arr[1] : null) as ControlSlotValueType
}

export default defineComponent({
  name: 'DataList',
  setup() {
    const Pair = usePair()
    const SocketStore = useSocketStore()
    const DataListParams = inject(DataListParamsKey)
    const currentExpand = inject<Ref<'left' | 'center' | 'right'>>('currentExpand')

    const loopSwitchSortValue = (sortType: string) => {
      if (DataListParams) {
        const valueArray = ['down', 'up', null]
        const currentValue = valueArray.indexOf(
          getControlSlotFilterValue(DataListParams.sortMethod, sortType)
        )
        if (currentValue !== -1) {
          const nextIndex =
            currentValue + 1 >= valueArray.length
              ? currentValue + 1 - valueArray.length
              : currentValue + 1
          const nextMethod = nextIndex === 2 ? null : `${sortType}-${valueArray[nextIndex]}`
          DataListParams.sortMethod = nextMethod
        }
      }
    }

    const dataList = ref<TradingDataItem[]>([])

    const queryParam = ref<{
      page?: number
      size?: number
      keyword?: string
      orderKey?: string
      orderValue?: number
    }>({
      page: 1,
      size: 100
    })

    const totalPage = ref(0)

    const fetchData = async function () {
      // Pair@get-pair-list
      const { error, data } = await services['Pair@get-pair-list'](queryParam.value)
      if (!error) {
        dataList.value = data.list.map(
          (item: ApiDocuments.proto_PairBasicResponse, index: number) => {
            const dexSort: any[] = [item.token0Info, item.token1Info]
            const pairs = [item.tokenW0 || '', item.tokenW1 || ''].map(
              (contractAddress: string) => {
                const targetIndex = dexSort.findIndex(
                  item => item.contractAddress === contractAddress
                )
                return targetIndex !== -1 ? dexSort[targetIndex] : {}
              }
            )
            return {
              id: item._id,
              index,
              token: pairs,
              views: item.views,
              createdAt: item.createdAt
            }
          }
        )

        totalPage.value = data.total
      }
    }

    watch(
      () => dataList.value,
      (newList, prevList) => {
        console.warn('watch dataList', newList, prevList)
        // socket subscribe
        if (newList.length) {
          SocketStore.subscribe(
            'trade-pair',
            newList.map(item =>
              Array.isArray(item.token) ? item.token.map(token => token.symbol).join('/') : null
            ),
            msg => {
              console.log('subscribe', msg)
              dataList.value = updatePairListWithSocketData(msg.data.value, dataList.value)
            }
          )
        }

        if (prevList && prevList.length) {
          SocketStore.unsubscribe(
            'trade-pair',
            prevList.map(item =>
              item && Array.isArray(item.token)
                ? item.token.map(token => token.symbol).join('/')
                : null
            )
          )
        }
      }
    )

    // init
    SocketStore.init().then(socket => {
      fetchData()
    })

    onBeforeUnmount(() => {
      SocketStore.unsubscribe('trade-pair', [])
    })

    const handleRowClick = (row: any) => {
      console.log('handleRowClick', row, currentExpand)
      currentExpand && (currentExpand.value = 'center')
      Pair.setCurrent(row)
    }

    const handleDataTableScroll = (evt: Event) => {
      console.log('handleDataTableScroll', evt)
    }

    return {
      currentExpand,
      dataList,
      DataListParams,
      loopSwitchSortValue,
      handleRowClick,
      handleDataTableScroll
    }
  },
  render() {
    return (
      <TradingDataList
        isStretch={this.currentExpand === 'left'}
        dataList={this.dataList}
        onSortSwitch={this.loopSwitchSortValue}
        onRowClick={row => {
          this.handleRowClick(row)
        }}
        tableProps={{
          'on-scroll': this.handleDataTableScroll
        }}
      />
    )
  }
})
