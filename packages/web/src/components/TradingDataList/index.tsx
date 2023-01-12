import { UTable } from '@wedex/components'
import { defineComponent, inject, computed, PropType, ref } from 'vue'
import ControlSlot from './ControlSlot'
import type { ControlSlotValueType } from './ControlSlot'
import AddToWatchList from '@/components/AddToWatchList'
import DynamicNumber from '@/components/DynamicNumber'
import Overlap from '@/components/Overlap'
import { DataListParamsKey } from '@/pages/index'
import type { ApiDocuments } from '@/services/a2s.namespace'
import { formatBigNumber, formatCurrency } from '@/utils/numberFormat'
import { customTimeAgo } from '@/utils/timeago'
import { timeRangeToSocketMap } from '@/utils/trading'

export type TradingDataItem = {
  pairReportIM?: any
  network?: ApiDocuments.model_Chain
  dex?: ApiDocuments.model_DEX
  id: string
  index: number
  tokenPair: Record<string, any>[]
  price?: number | string
  views?: number | string
  '5m'?: number
  '1h'?: number
  '4h'?: number
  '6h'?: number
  '24h'?: number
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

const getFullSortByString = (sortLabel: string, timeInterval: string) => {
  return `pairReportIM.${timeRangeToSocketMap(timeInterval)}.${sortLabel}`
}

export const getSortControlValueBySortType = (sortType?: number) => {
  const currentValue = [-1, 1, undefined].indexOf(sortType)
  return ['down', 'up', null][currentValue === -1 ? 2 : currentValue] as ControlSlotValueType
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

    const customRenderSortTitle = (
      sortTitle: string,
      finnalSortBy: string | null,
      typeReverse?: boolean
    ) => {
      const disableFilter = props.mode === 'watchlist'

      const handleTriggerUp = () => {
        if (DataListParams) {
          DataListParams.sortBy = finnalSortBy || undefined
          DataListParams.sortType = 1
        }
      }

      const handleTriggerDown = () => {
        if (DataListParams) {
          DataListParams.sortBy = finnalSortBy || undefined
          DataListParams.sortType = -1
        }
      }

      return (
        <div class="flex justify-end items-center">
          <div
            class="cursor-pointer select-none"
            onClick={() => !disableFilter && ctx.emit('sortSwitch', finnalSortBy)}
          >
            {sortTitle}
          </div>
          {DataListParams && !disableFilter && (
            <ControlSlot
              value={
                finnalSortBy === DataListParams.sortBy
                  ? getSortControlValueBySortType(DataListParams.sortType)
                  : null
              }
              onTriggerUp={() => {
                typeReverse ? handleTriggerDown() : handleTriggerUp()
              }}
              onTriggerDown={() => {
                typeReverse ? handleTriggerUp() : handleTriggerDown()
              }}
              onTriggerClear={() => {
                DataListParams.sortBy = undefined
                DataListParams.sortType = undefined
              }}
            />
          )}
        </div>
      )
    }

    const watchRef = ref()

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
          width: 60,
          fixed: 'left',
          render: (data: TradingDataItem, index: number) => {
            return (
              <div
                class="flex text-color3 justify-end items-center"
                ref={ref => (watchRef.value = ref)}
              >
                <AddToWatchList pairId={data.id} starClass="h-4 w-4" />
                <div class="w-5">{`${index + 1}`}</div>
              </div>
            )
          }
        })

        // dynamic Col with mainNav
        if (DataListParams) {
          switch (Number(DataListParams?.channelType)) {
            case 1:
              // Hot pairs
              extendColumns.push({
                title: customRenderSortTitle(
                  'Views',
                  getFullSortByString('views', DataListParams.timeInterval as string)
                ),
                key: 'views',
                align: 'right',
                render: (data: TradingDataItem, index: number) => {
                  return (
                    <span class="text-color1">{data.views ? formatCurrency(data.views) : 0}</span>
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
                title: customRenderSortTitle('Age', 'createdAt', true),
                key: 'createdAt',
                align: 'right',
                render: (data: TradingDataItem, index: number) => {
                  return (
                    <span class="text-color1">
                      {data.createdAt ? customTimeAgo(new Date().getTime() - data.createdAt) : '--'}
                    </span>
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
                    <span
                      class={`text-color1 ${data.TrendsUp ? 'text-color-up' : 'text-color-down'}`}
                    >
                      {data.TrendsUp ? 'Up' : 'Down'}
                    </span>
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
      }

      return DataListParams
        ? [
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
                        noOverlap
                        class="mr-2"
                        nodes={[data.network, data.dex].map(
                          item => item && <img src={item.logo} />
                        )}
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
                        <span class="text-color3">/ {data.tokenPair[1]?.symbol || '--'}</span>
                      )}
                    </div>
                  </div>
                )
              }
            },
            ...extendColumns,
            {
              title: customRenderSortTitle(
                'Price',
                getFullSortByString('price', DataListParams.timeInterval as string)
              ),
              key: 'price',
              align: 'right',
              width: props.isStretch ? undefined : 65,
              render: (data: TradingDataItem, index: number) => {
                return data.price ? `$${formatBigNumber(data.price)}` : '--'
              }
            },
            {
              title: customRenderSortTitle('5m', getFullSortByString('priceChange', '5m')),
              key: '5m',
              align: 'right',
              width: props.isStretch ? undefined : 65,
              render: (data: TradingDataItem, index: number) => {
                return (
                  <DynamicNumber
                    value={(data['5m'] || 0) * 100 + '%'}
                    symbol={data['5m'] && data['5m'] > 0 ? 1 : -1}
                  />
                )
              }
            },
            {
              title: customRenderSortTitle('1h', getFullSortByString('priceChange', '1h')),
              key: '1h',
              align: 'right',
              width: props.isStretch ? undefined : 65,
              render: (data: TradingDataItem, index: number) => {
                return (
                  <DynamicNumber
                    value={(data['1h'] || 0) * 100 + '%'}
                    symbol={data['1h'] && data['1h'] > 0 ? 1 : -1}
                  />
                )
              }
            },
            {
              title: customRenderSortTitle('4h', getFullSortByString('priceChange', '4h')),
              key: '4h',
              align: 'right',
              render: (data: TradingDataItem, index: number) => {
                return (
                  <DynamicNumber
                    value={(data['4h'] || 0) * 100 + '%'}
                    symbol={data['4h'] && data['4h'] > 0 ? 1 : -1}
                  />
                )
              }
            },
            {
              title: customRenderSortTitle('6h', getFullSortByString('priceChange', '6h')),
              key: '6h',
              align: 'right',
              render: (data: TradingDataItem, index: number) => {
                return (
                  <DynamicNumber
                    value={(data['6h'] || 0) * 100 + '%'}
                    symbol={data['6h'] && data['6h'] > 0 ? 1 : -1}
                  />
                )
              }
            },
            {
              title: customRenderSortTitle('24h', getFullSortByString('priceChange', '24h')),
              key: '24h',
              align: 'right',
              render: (data: TradingDataItem, index: number) => {
                return (
                  <DynamicNumber
                    value={(data['24h'] || 0) * 100 + '%'}
                    symbol={data['24h'] && data['24h'] > 0 ? 1 : -1}
                  />
                )
              }
            },
            {
              title: customRenderSortTitle(
                'Txns',
                getFullSortByString('txns.total', DataListParams.timeInterval as string)
              ),
              key: 'txns.total',
              align: 'right',
              render: (data: TradingDataItem, index: number) => {
                return (
                  <span class="text-color1">{data.Txns ? formatCurrency(data.Txns) : '--'}</span>
                )
              }
            },
            {
              title: customRenderSortTitle(
                'Buys',
                getFullSortByString('txns.buys', DataListParams.timeInterval as string)
              ),
              key: 'txns.buys',
              align: 'right',
              render: (data: TradingDataItem, index: number) => {
                return (
                  <span class="text-color1">{data.Buys ? formatCurrency(data.Buys) : '--'}</span>
                )
              }
            },
            {
              title: customRenderSortTitle(
                'Sells',
                getFullSortByString('txns.sells', DataListParams.timeInterval as string)
              ),
              key: 'txns.sells',
              align: 'right',
              render: (data: TradingDataItem, index: number) => {
                return (
                  <span class="text-color1">{data.Sells ? formatCurrency(data.Sells) : '--'}</span>
                )
              }
            },
            {
              title: customRenderSortTitle(
                'Vol',
                getFullSortByString('volume.total', DataListParams.timeInterval as string)
              ),
              key: 'volume.total',
              align: 'right',
              render: (data: TradingDataItem, index: number) => {
                return (
                  <span class="text-color1">
                    {data.Vol ? `$${formatBigNumber(data.Vol)}` : '--'}
                  </span>
                )
              }
            },
            {
              title: customRenderSortTitle('Liquidity', 'pairReportIM.liquidity'),
              key: 'liquidity',
              align: 'right',
              render: (data: TradingDataItem, index: number) => {
                return (
                  <span class="text-color1">
                    {data.Liquidity ? `$${formatBigNumber(data.Liquidity)}` : '--'}
                  </span>
                )
              }
            },
            {
              title: customRenderSortTitle('FDV', 'pairReportIM.fdv'),
              key: 'fdv',
              align: 'right',
              render: (data: TradingDataItem, index: number) => {
                return (
                  <span class="text-color1">
                    {data.FDV ? `$${formatBigNumber(data.FDV)}` : '--'}
                  </span>
                )
              }
            },
            {
              title: customRenderSortTitle('MKT Cap', 'pairReportIM.mktCap'),
              key: 'mktCap',
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
        : []
    })

    return {
      columns,
      watchRef
    }
  },
  render() {
    return (
      <UTable
        columns={this.columns}
        scroll-x={1350}
        data={this.dataList}
        {...Object.assign(
          {
            flexHeight: true
          },
          this.tableProps
        )}
        style={{
          '--n-box-shadow-after': 'inset 12px 0 8px -12px rgba(255,255,255,.4)'
        }}
        size="small"
        bordered={false}
        row-class-name="cursor-pointer"
        rowProps={(row: any) => {
          return {
            onClick: e => {
              console.log(e)
              if (!this.watchRef.contains(e.target)) {
                this.$emit('rowClick', row)
              }
            }
          }
        }}
      />
    )
  }
})
