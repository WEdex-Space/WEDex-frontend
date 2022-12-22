import { UTable } from '@wedex/components'
import { FilterOutlined } from '@wedex/icons'
import { defineComponent, ref, onMounted, computed } from 'vue'
import DynamicNumber from '@/components/DynamicNumber'
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

export default defineComponent({
  name: 'TransactionsBlock',
  setup(props, ctx) {
    const customRenderSortTitle = (sortTitle: string, sortType: string) => {
      return (
        <div class="cursor-pointer flex h-7 -mx-[2px] justify-end items-center hover:text-color2">
          <div>{sortTitle}</div>
          <FilterOutlined class="h-3 ml-[2px] w-3" />
        </div>
      )
    }

    const columns = computed<any[]>(() => {
      return [
        {
          title: customRenderSortTitle('Date', 'date'),
          key: 'date',
          align: 'right',
          render: (data: TransactionsDataType, index: number) => {
            return <div>2 secs</div>
          }
        },
        {
          title: customRenderSortTitle('Type', 'type'),
          key: 'type',
          align: 'center',
          render: (data: TransactionsDataType, index: number) => {
            return <strong class="text-color-up">{data.type}</strong>
          }
        },
        {
          title: customRenderSortTitle('USD', 'usd'),
          key: 'usd',
          align: 'right',
          render: (data: TransactionsDataType, index: number) => {
            return <DynamicNumber value={data['usd']} symbol={index % 2 ? 1 : -1} />
          }
        },
        {
          title: customRenderSortTitle('Price', 'price'),
          key: 'price',
          align: 'right',
          render: (data: TransactionsDataType, index: number) => {
            return <DynamicNumber value={data['price']} symbol={index % 2 ? 1 : -1} />
          }
        },
        {
          title: customRenderSortTitle('Token0', 'token0'),
          key: 'token0',
          align: 'right',
          render: (data: TransactionsDataType, index: number) => {
            return <DynamicNumber value={data['token0']} symbol={index % 2 ? 1 : -1} />
          }
        },
        {
          title: customRenderSortTitle('Token1', 'token1'),
          key: 'token1',
          align: 'right',
          render: (data: TransactionsDataType, index: number) => {
            return <DynamicNumber value={data['token1']} symbol={index % 2 ? 1 : -1} />
          }
        },
        {
          title: customRenderSortTitle('Maker', 'maker'),
          key: 'maker',
          align: 'right',
          render: (data: TransactionsDataType, index: number) => {
            return <div class="text-color-up text-color1 truncate underline">{data.maker}</div>
          }
        },
        {
          title: customRenderSortTitle('Txn', 'txn'),
          key: 'txn',
          align: 'right',
          render: (data: TransactionsDataType, index: number) => {
            return <div class="text-color-up text-color1 truncate underline">{data.txn}</div>
          }
        }
      ]
    })

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
      dataList
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
