import { defineComponent, ref, onMounted, inject, Ref } from 'vue'
import { default as TradingDataList, TradingDataItem } from '@/components/TradingDataList'
import { ControlSlotValueType } from '@/components/TradingDataList/ControlSlot'
import { DataListParamsKey } from '@/pages/index'

const getControlSlotFilterValue = (sortMethod: string | null, sortType: string) => {
  const arr = sortMethod?.split('-') || []
  return (arr.length === 2 && arr[0] === sortType ? arr[1] : null) as ControlSlotValueType
}

export default defineComponent({
  name: 'DataList',
  setup() {
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

    const fetchData = function () {
      const data = new Array(10).fill(null).map((e, i) => {
        return {
          index: i,
          token: `token_${i}`,
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
      })
      dataList.value = data
      // test
      // setTimeout(fetchData, 5000 * Math.random())
    }

    onMounted(() => {
      fetchData()
    })

    const handleRowClick = (row: any) => {
      console.log('handleRowClick', row, currentExpand)
      currentExpand && (currentExpand.value = 'center')
    }

    return {
      dataList,
      DataListParams,
      loopSwitchSortValue,
      handleRowClick
    }
  },
  render() {
    return (
      <TradingDataList
        dataList={this.dataList}
        onSortSwitch={this.loopSwitchSortValue}
        onRowClick={row => {
          this.handleRowClick(row)
        }}
      />
    )
  }
})
