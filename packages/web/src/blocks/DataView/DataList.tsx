import { defineComponent, ref, inject, Ref, onBeforeUnmount, watch } from 'vue'
import { default as TradingDataList, TradingDataItem } from '@/components/TradingDataList'
import { ControlSlotValueType } from '@/components/TradingDataList/ControlSlot'
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
      size: 50
    })

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
              index,
              token: pairs,
              price: Math.random() * 1e3,
              views: Math.floor(Math.random() * 1e7),
              '5m': (Math.random() * 10).toFixed(2),
              '1h': (Math.random() * 10).toFixed(2),
              '4h': (Math.random() * 10).toFixed(2),
              '6h': (Math.random() * 10).toFixed(2),
              '24h': (Math.random() * 10).toFixed(2),
              Txns: Math.floor(Math.random() * 1e7),
              Buys: Math.floor(Math.random() * 1e7),
              Sells: Math.floor(Math.random() * 1e7),
              Vol: Math.random() * Math.random() * 1e7,
              Liquidity: Math.random() * Math.random() * 1e7,
              FDV: Math.random() * Math.random() * 1e7,
              MKTCap: Math.random() * Math.random() * 1e7,
              createAt: Math.floor(Math.random() * Math.random() * 1e7),
              TrendsUp: !!(Math.floor(Math.random() * 10) % 2 > 0)
            }
          }
        )
      }
      // dataList.value = new Array(10).fill(null).map((e, i) => {
      //   return {
      //     index: i,
      //     token: `token_${i}`,
      //     price: Math.random() * 1e3,
      //     views: Math.floor(Math.random() * 1e7),
      //     '5m': (Math.random() * 10).toFixed(2),
      //     '1h': (Math.random() * 10).toFixed(2),
      //     '4h': (Math.random() * 10).toFixed(2),
      //     '6h': (Math.random() * 10).toFixed(2),
      //     '24h': (Math.random() * 10).toFixed(2),
      //     Txns: Math.floor(Math.random() * 1e7),
      //     Buys: Math.floor(Math.random() * 1e7),
      //     Sells: Math.floor(Math.random() * 1e7),
      //     Vol: Math.random() * Math.random() * 1e7,
      //     Liquidity: Math.random() * Math.random() * 1e7,
      //     FDV: Math.random() * Math.random() * 1e7,
      //     MKTCap: Math.random() * Math.random() * 1e7,
      //     createAt: Math.floor(Math.random() * Math.random() * 1e7),
      //     TrendsUp: !!(Math.floor(Math.random() * 10) % 2 > 0)
      //   }
      // })
      // test
      // setTimeout(fetchData, 5000 * Math.random())
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

    SocketStore.init().then(socket => {
      fetchData()
    })

    onBeforeUnmount(() => {
      SocketStore.unsubscribe('trade-pair', [])
    })

    const handleRowClick = (row: any) => {
      console.log('handleRowClick', row, currentExpand)
      currentExpand && (currentExpand.value = 'center')
    }

    return {
      currentExpand,
      dataList,
      DataListParams,
      loopSwitchSortValue,
      handleRowClick
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
      />
    )
  }
})
