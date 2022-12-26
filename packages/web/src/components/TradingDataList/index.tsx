import { UTable } from '@wedex/components'
import { StarOutlined } from '@wedex/icons'
import { defineComponent, inject, computed, PropType } from 'vue'
import ControlSlot from './ControlSlot'
import type { ControlSlotValueType } from './ControlSlot'
import DynamicNumber from '@/components/DynamicNumber'
import Overlap from '@/components/Overlap'
import { allNetworks } from '@/constants'
import { DataListParamsKey } from '@/pages/index'
import { formatBigNumber, formatCurrency } from '@/utils/numberFormat'
import { customTimeAgo } from '@/utils/timeago'

export type TradingDataItem = {
  index: number
  token: string
  price: number | string
  views: number | string
  '5m': number | string
  '1h': number | string
  '4h': number | string
  '6h': number | string
  '24h': number | string
  Txns: number
  Buys: number
  Sells: number
  Vol: number
  Liquidity: number
  FDV: number
  MKTCap: number
  createAt: number
  TrendsUp: boolean
}

const getControlSlotFilterValue = (sortMethod: string | null, sortType: string) => {
  const arr = sortMethod?.split('-') || []
  return (arr.length === 2 && arr[0] === sortType ? arr[1] : null) as ControlSlotValueType
}

export default defineComponent({
  name: 'TradingDataList',
  emits: ['sortSwitch', 'rowClick'],
  props: {
    dataList: {
      type: Array as PropType<TradingDataItem[]>
    },
    mode: {
      type: String as PropType<'datalist' | 'watchlist'>,
      default: 'datalist'
    },
    isStretch: {
      type: Boolean,
      default: true
    }
  },
  setup(props, ctx) {
    const DataListParams = inject(DataListParamsKey)

    const customRenderSortTitle = (sortTitle: string, sortType: string) => {
      const disableFilter = props.mode === 'watchlist'

      return (
        <div class="flex justify-end items-center">
          <div
            class="cursor-pointer select-none"
            onClick={() => !disableFilter && ctx.emit('sortSwitch', sortType)}
          >
            {sortTitle}
          </div>
          {DataListParams && !disableFilter && (
            <ControlSlot
              value={getControlSlotFilterValue(DataListParams.sortMethod, sortType)}
              onTriggerUp={() => {
                DataListParams.sortMethod = `${sortType}-up`
              }}
              onTriggerDown={() => {
                DataListParams.sortMethod = `${sortType}-down`
              }}
              onTriggerClear={() => {
                DataListParams.sortMethod = null
              }}
            />
          )}
        </div>
      )
    }

    const TokenColProp = computed(() => {
      let align = 'left'
      let width = 0

      if (props.mode === 'watchlist') {
        align = props.isStretch ? 'left' : 'center'
        width = props.isStretch ? 140 : 80
      } else {
        width = props.isStretch ? 140 : 60
      }

      return {
        align,
        width
      }
    })

    const columns = computed<any[]>(() => {
      const indexColumns: any[] = []
      const extendColumns: any[] = []

      if (props.mode === 'datalist') {
        // Only datalist show the Index Col
        indexColumns.push({
          title: '#',
          key: 'index',
          align: 'right',
          width: 70,
          fixed: 'left',
          render: (data: TradingDataItem, index: number) => {
            return (
              <div class="flex text-color3 justify-end items-center">
                <StarOutlined class="cursor-pointer h-4 mr-1 w-4 hover:text-primary" />
                <div>{`${index + 1}`}</div>
              </div>
            )
          }
        })

        // dynamic Col with mainNav
        switch (DataListParams?.type) {
          case 1:
            // Hot pairs
            extendColumns.push({
              title: customRenderSortTitle('Views', 'views'),
              key: 'views',
              align: 'right',
              render: (data: TradingDataItem, index: number) => {
                return <strong class="text-color1">{formatCurrency(data.views)}</strong>
              }
            })
            break
          case 2:
            // All pairs
            break
          case 3:
            // New pairs
            extendColumns.push({
              title: customRenderSortTitle('Age', 'age'),
              key: 'age',
              align: 'right',
              render: (data: TradingDataItem, index: number) => {
                return (
                  <strong class="text-color1">
                    {customTimeAgo(new Date().getTime() - data.createAt)}
                  </strong>
                )
              }
            })
            break
          case 4:
            // Trends
            extendColumns.push({
              title: 'Type',
              key: 'type',
              align: 'center',
              width: 60,
              render: (data: TradingDataItem, index: number) => {
                return (
                  <strong
                    class={`text-color1 ${data.TrendsUp ? 'text-color-up' : 'text-color-down'}`}
                  >
                    {data.TrendsUp ? 'Up' : 'Down'}
                  </strong>
                )
              }
            })
            break
          case 5:
            // Gainers & Losers
            break
          case 6:
            // Ranking
            break
          default:
        }
      }

      return [
        ...indexColumns,
        {
          title: 'Token',
          key: 'token',
          fixed: 'left',
          align: TokenColProp.value.align,
          width: TokenColProp.value.width,
          render: (data: TradingDataItem, index: number) => {
            return (
              <div class="flex flex-nowrap items-center">
                {/* TODO dragable */}
                {/* {props.mode === 'watchlist' && (
                  <span class="cursor-move pr-2 pl-1 text-color3 leading-0 hover:text-color2">
                    <DragOutlined class="h-3 " />
                  </span>
                )} */}
                {props.isStretch && (
                  <Overlap
                    class="mr-2"
                    nodes={[0, 1].map(index => (
                      <img src={allNetworks[index].logo} />
                    ))}
                  />
                )}
                <div class="flex-1 truncate" title={`Token1/Token2`}>
                  <strong class="text-color1 ">Token1</strong>
                  {props.isStretch && <strong class="text-color3">/ Token2</strong>}
                </div>
              </div>
            )
          }
        },
        ...extendColumns,
        {
          title: customRenderSortTitle('Price', 'price'),
          key: 'price',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return `$${formatBigNumber(data.price)}`
          }
        },
        {
          title: customRenderSortTitle('5m', '5m'),
          key: '5m',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return (
              <DynamicNumber
                class="font-semibold"
                value={data['5m'] + '%'}
                symbol={index % 2 ? 1 : -1}
              />
            )
          }
        },
        {
          title: customRenderSortTitle('1h', '1h'),
          key: '1h',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return (
              <DynamicNumber
                class="font-semibold"
                value={data['1h'] + '%'}
                symbol={index % 2 ? 1 : -1}
              />
            )
          }
        },
        {
          title: customRenderSortTitle('4h', '4h'),
          key: '4h',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return (
              <DynamicNumber
                class="font-semibold"
                value={data['4h'] + '%'}
                symbol={index % 2 ? 1 : -1}
              />
            )
          }
        },
        {
          title: customRenderSortTitle('6h', '6h'),
          key: '6h',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return (
              <DynamicNumber
                class="font-semibold"
                value={data['6h'] + '%'}
                symbol={index % 2 ? 1 : -1}
              />
            )
          }
        },
        {
          title: customRenderSortTitle('24h', '24h'),
          key: '24h',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return (
              <DynamicNumber
                class="font-semibold"
                value={data['24h'] + '%'}
                symbol={index % 2 ? 1 : -1}
              />
            )
          }
        },
        {
          title: customRenderSortTitle('Txns', 'Txns'),
          key: 'Txns',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return <strong class="text-color1">{formatCurrency(data.Txns)}</strong>
          }
        },
        {
          title: customRenderSortTitle('Buys', 'Buys'),
          key: 'Buys',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return <strong class="text-color1">{formatCurrency(data.Buys)}</strong>
          }
        },
        {
          title: customRenderSortTitle('Sells', 'Sells'),
          key: 'Sells',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return <strong class="text-color1">{formatCurrency(data.Sells)}</strong>
          }
        },
        {
          title: customRenderSortTitle('Vol', 'Vol'),
          key: 'Vol',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return <strong class="text-color1">{`$${formatBigNumber(data.Vol)}`}</strong>
          }
        },
        {
          title: customRenderSortTitle('Liquidity', 'Liquidity'),
          key: 'Liquidity',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return <strong class="text-color1">{`$${formatBigNumber(data.Liquidity)}`}</strong>
          }
        },
        {
          title: customRenderSortTitle('FDV', 'FDV'),
          key: 'FDV',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return <strong class="text-color1">{`$${formatBigNumber(data.FDV)}`}</strong>
          }
        },
        {
          title: customRenderSortTitle('MKT Cap', 'MKTCap'),
          key: 'MKTCap',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return <strong class="text-color1">{`$${formatBigNumber(data.MKTCap)}`}</strong>
          }
        }
      ]
    })

    return {
      columns,
      DataListParams
    }
  },
  render() {
    return (
      <UTable
        columns={this.columns}
        scroll-x={1300}
        data={this.dataList}
        flex-height
        size="small"
        bordered={false}
        row-class-name="cursor-pointer"
        rowProps={(row: any) => {
          return {
            onClick: () => {
              this.$emit('rowClick', row)
            }
          }
        }}
      />
    )
  }
})
