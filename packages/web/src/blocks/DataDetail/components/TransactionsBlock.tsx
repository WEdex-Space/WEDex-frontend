import { UTable } from '@wedex/components'
import { FilterOutlined } from '@wedex/icons'
import { defineComponent, ref, onMounted, h, Component, computed } from 'vue'
import DateRangeFilterPopover from './DateRangeFilterPopover'
import NumberRangeFilterPopover from './NumberRangeFilterPopover'
import TrendTypeFilterPopover from './TrendTypeFilterPopover'
import DynamicNumber from '@/components/DynamicNumber'
import TimeAgo from '@/components/TimeAgo'
import { formatCurrency, formatCurrencyWithUnit } from '@/utils/numberFormat'

type TransactionsDataType = {
  date: number
  type: string
  usd: number
  price: number
  token0: number
  token1: number
  maker: string
  txn: string
}

const FilterComponentMap: {
  [key: string]: Component
} = {
  date: DateRangeFilterPopover,
  type: TrendTypeFilterPopover,
  usd: NumberRangeFilterPopover,
  price: NumberRangeFilterPopover,
  token0: NumberRangeFilterPopover,
  token1: NumberRangeFilterPopover
}

export default defineComponent({
  name: 'TransactionsBlock',
  setup(props, ctx) {
    const filterData = ref({
      date: {
        from: 0,
        to: 0
      },
      type: '',
      usd: {
        from: 0,
        to: 0
      },
      price: {
        from: 0,
        to: 0
      },
      token0: {
        from: 0,
        to: 0
      },
      token1: {
        from: 0,
        to: 0
      }
    })

    const customRenderSortTitle = (
      sortTitle: string,
      filterName: string,
      filterProps?: { [key: string]: any } | null
    ) => {
      const content = (hasValue?: boolean) => (
        <div class="cursor-pointer flex h-7 -mx-[2px] justify-end items-center hover:text-color2">
          <div>{sortTitle}</div>
          <FilterOutlined class={`h-3 ml-[2px] w-3 ${hasValue ? 'text-primary' : ''}`} />
        </div>
      )

      return FilterComponentMap[filterName]
        ? h(FilterComponentMap[filterName], filterProps || null, {
            default: content
          })
        : content()
    }

    const columns = computed<any[]>(() => [
      {
        title: customRenderSortTitle('Date', 'date', {
          values: filterData.value.date,
          onChange: (value: any) => (filterData.value.date = value)
        }),
        key: 'date',
        align: 'right',
        render: (data: TransactionsDataType, index: number) => {
          return <TimeAgo value={data.date} />
        }
      },
      {
        title: customRenderSortTitle('Type', 'type', {
          value: filterData.value.type,
          onChange: (value: string) => (filterData.value.type = value)
        }),
        key: 'type',
        align: 'center',
        render: (data: TransactionsDataType, index: number) => {
          return <strong class="text-color-up">{data.type}</strong>
        }
      },
      {
        title: customRenderSortTitle('USD', 'usd', {
          inputProps: {
            prefix: '$'
          },
          values: filterData.value.usd,
          onChange: (value: any) => (filterData.value.usd = value)
        }),
        key: 'usd',
        align: 'right',
        render: (data: TransactionsDataType, index: number) => {
          return <DynamicNumber value={data['usd']} symbol={index % 2 ? 1 : -1} />
        }
      },
      {
        title: customRenderSortTitle('Price', 'price', {
          inputProps: {
            prefix: '$'
          },
          values: filterData.value.price,
          onChange: (value: any) => (filterData.value.price = value)
        }),
        key: 'price',
        align: 'right',
        render: (data: TransactionsDataType, index: number) => {
          return <DynamicNumber value={data['price']} symbol={index % 2 ? 1 : -1} />
        }
      },
      {
        title: customRenderSortTitle('Token0', 'token0', {
          inputProps: {
            suffix: 'Token0'
          },
          values: filterData.value.token0,
          onChange: (value: any) => (filterData.value.token0 = value)
        }),
        key: 'token0',
        align: 'right',
        render: (data: TransactionsDataType, index: number) => {
          return <DynamicNumber value={data['token0']} symbol={index % 2 ? 1 : -1} />
        }
      },
      {
        title: customRenderSortTitle('Token1', 'token1', {
          inputProps: {
            suffix: 'Token1'
          },
          values: filterData.value.token1,
          onChange: (value: any) => (filterData.value.token1 = value)
        }),
        key: 'token1',
        align: 'right',
        render: (data: TransactionsDataType, index: number) => {
          return <DynamicNumber value={data['token1']} symbol={index % 2 ? 1 : -1} />
        }
      },
      {
        title: 'Maker',
        key: 'maker',
        align: 'right',
        render: (data: TransactionsDataType, index: number) => {
          return <div class="text-color-up text-color1 truncate underline">{data.maker}</div>
        }
      },
      {
        title: 'Txn',
        key: 'txn',
        align: 'right',
        render: (data: TransactionsDataType, index: number) => {
          return <div class="text-color-up text-color1 truncate underline">{data.txn}</div>
        }
      }
    ])

    const dataList = ref<any[]>([])

    const fetchData = function () {
      const data = new Array(10).fill(null).map((e, i) => {
        return {
          date: new Date().getTime() - Math.floor(Math.random() * 1e5),
          type: Math.floor(Math.random() * 10) % 2 > 0 ? 'Buy' : 'Sell',
          usd: formatCurrency((Math.random() * 1e5).toFixed(0)),
          price: formatCurrencyWithUnit((Math.random() * 1e5).toFixed(0)),
          token0: formatCurrency((Math.random() * 1e5).toFixed(0)),
          token1: formatCurrency((Math.random() * 1e5).toFixed(0)),
          maker: '41123112321',
          txn: '41123112321'
        }
      })
      dataList.value = data
      // test
      // setTimeout(fetchData, 5000 * Math.random())
    }

    onMounted(() => {
      fetchData()
    })

    return {
      columns,
      dataList,
      filterData
    }
  },
  render() {
    return (
      <UTable
        class={`h-full transparentTable`}
        columns={this.columns}
        data={this.dataList}
        flex-height
        size="small"
        bordered={false}
      />
    )
  }
})
