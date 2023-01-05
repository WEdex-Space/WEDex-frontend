import { UTable } from '@wedex/components'
import { StarOutlined } from '@wedex/icons'
import { defineComponent, inject, computed, PropType } from 'vue'
import ControlSlot from './ControlSlot'
import type { ControlSlotValueType } from './ControlSlot'
import DynamicNumber from '@/components/DynamicNumber'
import Overlap from '@/components/Overlap'
import { DataListParamsKey } from '@/pages/index'
import { formatBigNumber, formatCurrency } from '@/utils/numberFormat'
import { customTimeAgo } from '@/utils/timeago'

export type TradingDataItem = {
  pairReportIM?: any
  id: string
  index: number
  tokenPair: Record<string, any>[]
  price?: number | string
  views?: number | string
  '5m'?: number | string
  '1h'?: number | string
  '4h'?: number | string
  '6h'?: number | string
  '24h'?: number | string
  Txns?: number
  Buys?: number
  Sells?: number
  Vol?: number
  Liquidity?: number
  FDV?: number
  MKTCap?: number
  createdAt?: number
  TrendsUp?: boolean
}

export const getControlSlotFilterValue = (sortType: string, sortMethod?: string) => {
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
    },
    tableProps: {
      type: Object,
      default() {
        return {}
      }
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
              value={getControlSlotFilterValue(sortType, DataListParams.sortMethod)}
              onTriggerUp={() => {
                DataListParams.sortMethod = `${sortType}-up`
              }}
              onTriggerDown={() => {
                DataListParams.sortMethod = `${sortType}-down`
              }}
              onTriggerClear={() => {
                DataListParams.sortMethod = undefined
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
                return (
                  <strong class="text-color1">{data.views ? formatCurrency(data.views) : 0}</strong>
                )
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
                    {data.createdAt ? customTimeAgo(new Date().getTime() - data.createdAt) : '--'}
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
                    nodes={data.tokenPair.map(item => (
                      <img src={item.logo} />
                    ))}
                  />
                )}
                <div
                  class="flex-1 truncate"
                  title={`${
                    Array.isArray(data.tokenPair)
                      ? data.tokenPair.map(e => e.symbol).join('/')
                      : '--'
                  }`}
                >
                  <strong class="text-color1">{data.tokenPair[0]?.symbol || '--'}</strong>
                  {props.isStretch && (
                    <strong class="text-color3">/ {data.tokenPair[1]?.symbol || '--'}</strong>
                  )}
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
            return data.price ? `$${formatBigNumber(data.price)}` : '--'
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
                value={data['5m'] ? data['5m'] + '%' : '--'}
                symbol={data['5m'] && data['5m'] > 0 ? 1 : -1}
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
                value={data['1h'] ? data['1h'] + '%' : '--'}
                symbol={data['1h'] && data['1h'] > 0 ? 1 : -1}
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
                value={data['4h'] ? data['4h'] + '%' : '--'}
                symbol={data['4h'] && data['4h'] > 0 ? 1 : -1}
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
                value={data['6h'] ? data['6h'] + '%' : '--'}
                symbol={data['6h'] && data['6h'] > 0 ? 1 : -1}
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
                value={data['24h'] ? data['24h'] + '%' : '--'}
                symbol={data['24h'] && data['24h'] > 0 ? 1 : -1}
              />
            )
          }
        },
        {
          title: customRenderSortTitle('Txns', 'Txns'),
          key: 'Txns',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return (
              <strong class="text-color1">{data.Txns ? formatCurrency(data.Txns) : '--'}</strong>
            )
          }
        },
        {
          title: customRenderSortTitle('Buys', 'Buys'),
          key: 'Buys',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return <span class="text-color1">{data.Buys ? formatCurrency(data.Buys) : '--'}</span>
          }
        },
        {
          title: customRenderSortTitle('Sells', 'Sells'),
          key: 'Sells',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return <span class="text-color1">{data.Sells ? formatCurrency(data.Sells) : '--'}</span>
          }
        },
        {
          title: customRenderSortTitle('Vol', 'Vol'),
          key: 'Vol',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return (
              <span class="text-color1">{data.Vol ? `$${formatBigNumber(data.Vol)}` : '--'}</span>
            )
          }
        },
        {
          title: customRenderSortTitle('Liquidity', 'Liquidity'),
          key: 'Liquidity',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return (
              <strong class="text-color1">
                {data.Liquidity ? `$${formatBigNumber(data.Liquidity)}` : '--'}
              </strong>
            )
          }
        },
        {
          title: customRenderSortTitle('FDV', 'FDV'),
          key: 'FDV',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return (
              <span class="text-color1">{data.FDV ? `$${formatBigNumber(data.FDV)}` : '--'}</span>
            )
          }
        },
        {
          title: customRenderSortTitle('MKT Cap', 'MKTCap'),
          key: 'MKTCap',
          align: 'right',
          render: (data: TradingDataItem, index: number) => {
            return (
              <span class="text-color1">
                {data.MKTCap ? `$${formatBigNumber(data.MKTCap)}` : '--'}
              </span>
            )
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
        {...Object.assign({ flexHeight: true }, this.tableProps)}
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
