import { UTable } from '@wedex/components'
import { FilterOutlined } from '@wedex/icons'
import { defineComponent, ref, h, Component, computed, watch, onBeforeUnmount } from 'vue'
import DateRangeFilterPopover from './DateRangeFilterPopover'
import NumberRangeFilterPopover from './NumberRangeFilterPopover'
import TrendTypeFilterPopover from './TrendTypeFilterPopover'
import TimeAgo from '@/components/TimeAgo'
import { usePair } from '@/hooks'
import { services } from '@/services'
import type { ApiDocuments } from '@/services/a2s.namespace'
import { useSocketStore } from '@/stores'
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
  props: {
    pairId: {
      type: String
    }
  },
  setup(props, ctx) {
    const Pair = usePair()
    const SocketStore = useSocketStore()
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
      filterProps?: { [key: string]: any } | null,
      align?: 'left' | 'center' | 'right'
    ) => {
      const flexAlignClass = {
        left: 'start',
        center: 'justify-center',
        right: 'justify-end'
      }[align || 'right']

      const content = (hasValue?: boolean) => (
        <div
          class={`cursor-pointer flex h-5 -mx-[2px] ${flexAlignClass} items-center hover:text-color2`}
        >
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

    const columns = computed<any[]>(() =>
      Pair.detail.value
        ? [
            {
              title: customRenderSortTitle(
                'Date',
                'date',
                {
                  values: filterData.value.date,
                  onChange: (value: any) => (filterData.value.date = value)
                },
                'center'
              ),
              key: 'date',
              align: 'center',
              render: (data: TransactionsDataType, index: number) => {
                return <TimeAgo value={data.date} />
              }
            },
            {
              title: customRenderSortTitle(
                'Type',
                'type',
                {
                  value: filterData.value.type,
                  onChange: (value: string) => (filterData.value.type = value)
                },
                'center'
              ),
              key: 'type',
              align: 'center',
              width: 60,
              render: (data: TransactionsDataType, index: number) => {
                return (
                  <strong class={data.type ? 'text-color-up' : 'text-color-down'}>
                    {data.type ? 'Buy' : 'Sell'}
                  </strong>
                )
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
                return (
                  <span class={data.type ? 'text-color-up' : 'text-color-down'}>{data.usd}</span>
                )
              }
            },
            {
              title: customRenderSortTitle('Price USD', 'price', {
                inputProps: {
                  prefix: '$'
                },
                values: filterData.value.price,
                onChange: (value: any) => (filterData.value.price = value)
              }),
              key: 'price',
              align: 'right',
              render: (data: TransactionsDataType, index: number) => {
                return (
                  <span class={data.type ? 'text-color-up' : 'text-color-down'}>
                    {data['price']}
                  </span>
                )
              }
            },
            {
              title: customRenderSortTitle(
                `AMT ${Pair.current?.value?.tokenPair[0].symbol}`,
                'token0',
                {
                  inputProps: {
                    suffix: 'Token0'
                  },
                  values: filterData.value.token0,
                  onChange: (value: any) => (filterData.value.token0 = value)
                }
              ),
              key: 'token0',
              align: 'right',
              render: (data: TransactionsDataType, index: number) => {
                return (
                  <span class={data.type ? 'text-color-up' : 'text-color-down'}>
                    {data['token0']}
                  </span>
                )
              }
            },
            {
              title: customRenderSortTitle(
                `Total ${Pair.current?.value?.tokenPair[1].symbol}`,
                'token1',
                {
                  inputProps: {
                    suffix: 'Token1'
                  },
                  values: filterData.value.token1,
                  onChange: (value: any) => (filterData.value.token1 = value)
                }
              ),
              key: 'token1',
              align: 'right',
              render: (data: TransactionsDataType, index: number) => {
                return (
                  <span class={data.type ? 'text-color-up' : 'text-color-down'}>
                    {data['token1']}
                  </span>
                )
              }
            },
            {
              title: 'Maker',
              key: 'maker',
              align: 'right',
              render: (data: TransactionsDataType, index: number) => {
                return (
                  <div class="truncate underline">
                    <span class={data.type ? 'text-color-up' : 'text-color-down'}>
                      {data.maker.slice(data.maker.length - 6)}
                    </span>
                  </div>
                )
              }
            },
            {
              title: 'Txn',
              key: 'txn',
              align: 'right',
              render: (data: TransactionsDataType, index: number) => {
                return (
                  <div class="truncate underline">
                    <span class={data.type ? 'text-color-up' : 'text-color-down'}>
                      {data.txn.slice(data.maker.length - 6)}
                    </span>
                  </div>
                )
              }
            }
          ]
        : []
    )

    const dataList = ref<any[]>([])
    const queryParam = ref<{
      page?: number
      size?: number
      pairId: string
    }>({
      page: 1,
      size: 50,
      pairId: ''
    })
    const totalPage = ref(0)

    // return true=Buy || false=Cell
    const transactionBuyOrSell = (item: ApiDocuments.proto_PairTransactionResponse) => {
      return !!(item.amount1In && item.amount1In > 0)
    }

    const formatDataItem = (item: ApiDocuments.proto_PairTransactionResponse) => {
      return {
        date: item.blockTime ? item.blockTime * 1000 : 0,
        type: transactionBuyOrSell(item),
        usd: formatCurrencyWithUnit(
          transactionBuyOrSell(item) ? item.amountOutUSD : item.amountInUSD
        ),
        price: formatCurrencyWithUnit(item.token0PriceUSD),
        token0: formatCurrency(
          (transactionBuyOrSell(item) ? item.amount0Out : item.amount0In) || 0
        ),
        token1: formatCurrency(
          (transactionBuyOrSell(item) ? item.amount1In : item.amount1Out) || 0
        ),
        maker: item.from,
        txn: item.transactionHash
      }
    }

    const fetchData = async function () {
      const { error, data } = await services['Pair@get-pair-transaction-list'](queryParam.value)
      if (!error) {
        dataList.value = data?.list.map((item: ApiDocuments.proto_PairTransactionResponse) => {
          return formatDataItem(item)
        })

        totalPage.value = data.total
      }

      // test
      // setTimeout(fetchData, 5000 * Math.random())
    }

    watch(
      () => props.pairId,
      () => {
        if (props.pairId) {
          queryParam.value.pairId = props.pairId
          fetchData()

          // 注册 socket 监听
          SocketStore.init().then(socket => {
            SocketStore.subscribe('trade-tick', [props.pairId], msg => {
              console.log('subscribe trade-tick', msg)
              dataList.value.unshift(formatDataItem(msg))
            })
          })
        }
      },
      {
        immediate: true
      }
    )

    onBeforeUnmount(() => {
      // 卸载 socket 监听
      SocketStore.init().then(socket => {
        SocketStore.unsubscribe('trade-tick')
      })
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
