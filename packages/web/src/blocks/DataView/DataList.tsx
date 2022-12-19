import { UTable } from '@wedex/components'
import { StarOutlined } from '@wedex/icons'
import { format } from 'timeago.js'
import { defineComponent, ref, onMounted, inject, computed } from 'vue'
import { default as ControlSlot, ControlSlotValueType } from './components/ControlSlot'
import { DataListParamsKey } from './index'
import DynamicNumber from '@/components/DynamicNumber'
import Overlap from '@/components/Overlap'
import { allNetworks } from '@/constants'

export type DataItem = {
  index: number
  token: string
  price: number
  views: number
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
  name: 'DataList',
  setup() {
    const DataListParams = inject(DataListParamsKey)

    const columns = computed<any[]>(() => {
      const extendColumns: any[] = []
      switch (DataListParams?.type) {
        case 1:
          // Hot pairs
          extendColumns.push({
            title() {
              return (
                <div class="flex justify-end items-center">
                  <div>Views</div>
                  {DataListParams && (
                    <ControlSlot
                      value={getControlSlotFilterValue(DataListParams.sortMethod, 'views')}
                      onTriggerUp={() => {
                        DataListParams.sortMethod = 'views-up'
                      }}
                      onTriggerDown={() => {
                        DataListParams.sortMethod = 'views-down'
                      }}
                      onTriggerClear={() => {
                        DataListParams.sortMethod = null
                      }}
                    />
                  )}
                </div>
              )
            },
            key: 'views',
            align: 'right',
            render: (data: DataItem, index: number) => {
              return <strong class="text-color1">{data.views}</strong>
            }
          })
          break
        case 2:
          // All pairs
          break
        case 3:
          // New pairs
          extendColumns.push({
            title() {
              return (
                <div class="flex justify-end items-center">
                  <div>Age</div>
                  {DataListParams && (
                    <ControlSlot
                      value={getControlSlotFilterValue(DataListParams.sortMethod, 'age')}
                      onTriggerUp={() => {
                        DataListParams.sortMethod = 'age-up'
                      }}
                      onTriggerDown={() => {
                        DataListParams.sortMethod = 'age-down'
                      }}
                      onTriggerClear={() => {
                        DataListParams.sortMethod = null
                      }}
                    />
                  )}
                </div>
              )
            },
            key: 'age',
            align: 'right',
            render: (data: DataItem, index: number) => {
              return (
                <strong class="text-color1">
                  {format(new Date(new Date().getTime() - data.createAt), 'customTimeAgo')}
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
            render: (data: DataItem, index: number) => {
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

      return [
        {
          title: '#',
          key: 'index',
          align: 'right',
          width: 70,
          fixed: 'left',
          render: (data: DataItem, index: number) => {
            return (
              <div class="flex text-color3 justify-end items-center">
                <StarOutlined class="cursor-pointer h-4 mr-1 w-4 hover:text-primary" />
                <div>{`${index + 1}`}</div>
              </div>
            )
          }
        },
        {
          title: 'Token',
          key: 'token',
          fixed: 'left',
          width: 150,
          render: (data: DataItem, index: number) => {
            return (
              <div class="flex flex-nowrap items-center">
                <Overlap
                  class="mr-2"
                  nodes={[0, 1].map(index => (
                    <img src={allNetworks[index].logo} />
                  ))}
                />
                <div class="flex-1 truncate" title={`Token1/Token2`}>
                  <strong class="text-color1 ">Token1</strong>
                  <strong class="text-color3">/ Token2</strong>
                </div>
              </div>
            )
          }
        },
        ...extendColumns,
        {
          title() {
            return (
              <div class="flex justify-end items-center">
                <div>Price</div>
                {DataListParams && (
                  <ControlSlot
                    value={getControlSlotFilterValue(DataListParams.sortMethod, 'price')}
                    onTriggerUp={() => {
                      DataListParams.sortMethod = 'price-up'
                    }}
                    onTriggerDown={() => {
                      DataListParams.sortMethod = 'price-down'
                    }}
                    onTriggerClear={() => {
                      DataListParams.sortMethod = null
                    }}
                  />
                )}
              </div>
            )
          },
          key: 'price',
          align: 'right'
        },
        {
          title() {
            return (
              <div class="flex justify-end items-center">
                <div>5m</div>
                {DataListParams && (
                  <ControlSlot
                    value={getControlSlotFilterValue(DataListParams.sortMethod, '5m')}
                    onTriggerUp={() => {
                      DataListParams.sortMethod = '5m-up'
                    }}
                    onTriggerDown={() => {
                      DataListParams.sortMethod = '5m-down'
                    }}
                    onTriggerClear={() => {
                      DataListParams.sortMethod = null
                    }}
                  />
                )}
              </div>
            )
          },
          key: '5m',
          align: 'right',
          render: (data: DataItem, index: number) => {
            return <DynamicNumber value={data['5m'] + '%'} symbol={index % 2 ? 1 : -1} />
          }
        },
        {
          title() {
            return (
              <div class="flex justify-end items-center">
                <div>1h</div>
                {DataListParams && (
                  <ControlSlot
                    value={getControlSlotFilterValue(DataListParams.sortMethod, '1h')}
                    onTriggerUp={() => {
                      DataListParams.sortMethod = '1h-up'
                    }}
                    onTriggerDown={() => {
                      DataListParams.sortMethod = '1h-down'
                    }}
                    onTriggerClear={() => {
                      DataListParams.sortMethod = null
                    }}
                  />
                )}
              </div>
            )
          },
          key: '1h',
          align: 'right',
          render: (data: DataItem, index: number) => {
            return <DynamicNumber value={data['1h'] + '%'} symbol={index % 2 ? 1 : -1} />
          }
        },
        {
          title() {
            return (
              <div class="flex justify-end items-center">
                <div>4h</div>
                {DataListParams && (
                  <ControlSlot
                    value={getControlSlotFilterValue(DataListParams.sortMethod, '4h')}
                    onTriggerUp={() => {
                      DataListParams.sortMethod = '4h-up'
                    }}
                    onTriggerDown={() => {
                      DataListParams.sortMethod = '4h-down'
                    }}
                    onTriggerClear={() => {
                      DataListParams.sortMethod = null
                    }}
                  />
                )}
              </div>
            )
          },
          key: '4h',
          align: 'right',
          render: (data: DataItem, index: number) => {
            return <DynamicNumber value={data['4h'] + '%'} symbol={index % 2 ? 1 : -1} />
          }
        },
        {
          title() {
            return (
              <div class="flex justify-end items-center">
                <div>6h</div>
                {DataListParams && (
                  <ControlSlot
                    value={getControlSlotFilterValue(DataListParams.sortMethod, '6h')}
                    onTriggerUp={() => {
                      DataListParams.sortMethod = '6h-up'
                    }}
                    onTriggerDown={() => {
                      DataListParams.sortMethod = '6h-down'
                    }}
                    onTriggerClear={() => {
                      DataListParams.sortMethod = null
                    }}
                  />
                )}
              </div>
            )
          },
          key: '6h',
          align: 'right',
          render: (data: DataItem, index: number) => {
            return <DynamicNumber value={data['6h'] + '%'} symbol={index % 2 ? 1 : -1} />
          }
        },
        {
          title() {
            return (
              <div class="flex justify-end items-center">
                <div>24h</div>
                {DataListParams && (
                  <ControlSlot
                    value={getControlSlotFilterValue(DataListParams.sortMethod, '24h')}
                    onTriggerUp={() => {
                      DataListParams.sortMethod = '24h-up'
                    }}
                    onTriggerDown={() => {
                      DataListParams.sortMethod = '24h-down'
                    }}
                    onTriggerClear={() => {
                      DataListParams.sortMethod = null
                    }}
                  />
                )}
              </div>
            )
          },
          key: '24h',
          align: 'right',
          render: (data: DataItem, index: number) => {
            return <DynamicNumber value={data['24h'] + '%'} symbol={index % 2 ? 1 : -1} />
          }
        },
        {
          title() {
            return (
              <div class="flex justify-end items-center">
                <div>Txns</div>
                {DataListParams && (
                  <ControlSlot
                    value={getControlSlotFilterValue(DataListParams.sortMethod, 'Txns')}
                    onTriggerUp={() => {
                      DataListParams.sortMethod = 'Txns-up'
                    }}
                    onTriggerDown={() => {
                      DataListParams.sortMethod = 'Txns-down'
                    }}
                    onTriggerClear={() => {
                      DataListParams.sortMethod = null
                    }}
                  />
                )}
              </div>
            )
          },
          key: 'Txns',
          align: 'right',
          render: (data: DataItem, index: number) => {
            return <strong class="text-color1">{data.Txns}</strong>
          }
        },
        {
          title() {
            return (
              <div class="flex justify-end items-center">
                <div>Buys</div>
                {DataListParams && (
                  <ControlSlot
                    value={getControlSlotFilterValue(DataListParams.sortMethod, 'Buys')}
                    onTriggerUp={() => {
                      DataListParams.sortMethod = 'Buys-up'
                    }}
                    onTriggerDown={() => {
                      DataListParams.sortMethod = 'Buys-down'
                    }}
                    onTriggerClear={() => {
                      DataListParams.sortMethod = null
                    }}
                  />
                )}
              </div>
            )
          },
          key: 'Buys',
          align: 'right'
        },
        {
          title() {
            return (
              <div class="flex justify-end items-center">
                <div>Sells</div>
                {DataListParams && (
                  <ControlSlot
                    value={getControlSlotFilterValue(DataListParams.sortMethod, 'Sells')}
                    onTriggerUp={() => {
                      DataListParams.sortMethod = 'Sells-up'
                    }}
                    onTriggerDown={() => {
                      DataListParams.sortMethod = 'Sells-down'
                    }}
                    onTriggerClear={() => {
                      DataListParams.sortMethod = null
                    }}
                  />
                )}
              </div>
            )
          },
          key: 'Sells',
          align: 'right'
        },
        {
          title() {
            return (
              <div class="flex justify-end items-center">
                <div>Vol</div>
                {DataListParams && (
                  <ControlSlot
                    value={getControlSlotFilterValue(DataListParams.sortMethod, 'Vol')}
                    onTriggerUp={() => {
                      DataListParams.sortMethod = 'Vol-up'
                    }}
                    onTriggerDown={() => {
                      DataListParams.sortMethod = 'Vol-down'
                    }}
                    onTriggerClear={() => {
                      DataListParams.sortMethod = null
                    }}
                  />
                )}
              </div>
            )
          },
          key: 'Vol',
          align: 'right'
        },
        {
          title() {
            return (
              <div class="flex justify-end items-center">
                <div>Liquidity</div>
                {DataListParams && (
                  <ControlSlot
                    value={getControlSlotFilterValue(DataListParams.sortMethod, 'Liquidity')}
                    onTriggerUp={() => {
                      DataListParams.sortMethod = 'Liquidity-up'
                    }}
                    onTriggerDown={() => {
                      DataListParams.sortMethod = 'Liquidity-down'
                    }}
                    onTriggerClear={() => {
                      DataListParams.sortMethod = null
                    }}
                  />
                )}
              </div>
            )
          },
          key: 'Liquidity',
          align: 'right',
          render: (data: DataItem, index: number) => {
            return <strong class="text-color1">{data.Liquidity}</strong>
          }
        },
        {
          title() {
            return (
              <div class="flex justify-end items-center">
                <div>FDV</div>
                {DataListParams && (
                  <ControlSlot
                    value={getControlSlotFilterValue(DataListParams.sortMethod, 'FDV')}
                    onTriggerUp={() => {
                      DataListParams.sortMethod = 'FDV-up'
                    }}
                    onTriggerDown={() => {
                      DataListParams.sortMethod = 'FDV-down'
                    }}
                    onTriggerClear={() => {
                      DataListParams.sortMethod = null
                    }}
                  />
                )}
              </div>
            )
          },
          key: 'FDV',
          align: 'right'
        },
        {
          title() {
            return (
              <div class="flex justify-end items-center">
                <div>MKT Cap</div>
                {DataListParams && (
                  <ControlSlot
                    value={getControlSlotFilterValue(DataListParams.sortMethod, 'MKTCap')}
                    onTriggerUp={() => {
                      DataListParams.sortMethod = 'MKTCap-up'
                    }}
                    onTriggerDown={() => {
                      DataListParams.sortMethod = 'MKTCap-down'
                    }}
                    onTriggerClear={() => {
                      DataListParams.sortMethod = null
                    }}
                  />
                )}
              </div>
            )
          },
          key: 'MKTCap',
          align: 'right'
        }
      ]
    })

    const dataList = ref<any[]>([])

    const fetchData = function () {
      const data = new Array(10).fill(null).map((e, i) => {
        return {
          index: i,
          token: `token_${i}`,
          price: `$${(Math.random() * 10).toFixed(2)}`,
          views: Math.floor(Math.random() * 1000),
          '5m': (Math.random() * 10).toFixed(2),
          '1h': (Math.random() * 10).toFixed(2),
          '4h': (Math.random() * 10).toFixed(2),
          '6h': (Math.random() * 10).toFixed(2),
          '24h': (Math.random() * 10).toFixed(2),
          Txns: Math.floor(Math.random() * 1000),
          Buys: Math.floor(Math.random() * 1000),
          Sells: Math.floor(Math.random() * 1000),
          Vol: `$${(Math.random() * 1e5).toFixed(2)}`,
          Liquidity: `$${(Math.random() * 1e5).toFixed(2)}`,
          FDV: `$${(Math.random() * 1e5).toFixed(2)}`,
          MKTCap: `$${(Math.random() * 1e5).toFixed(2)}`,
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

    return {
      columns,
      dataList,
      DataListParams
    }
  },
  render() {
    return (
      <UTable
        columns={this.columns}
        scroll-x={1500}
        data={this.dataList}
        flex-height
        size="small"
        bordered={false}
      />
    )
  }
})
