import { UTable } from '@wedex/components'
import { StarOutlined } from '@wedex/icons'
import { format } from 'timeago.js'
import { defineComponent, ref, onMounted, inject, computed } from 'vue'
import { default as ControlSlot, ControlSlotValueType } from './components/ControlSlot'
import { DataListParamsKey } from './index'
import DynamicNumber from '@/components/DynamicNumber'
import Overlap from '@/components/Overlap'
import { allNetworks } from '@/constants'
import { formatMoney, formatBigNumber } from '@/utils/numberFormat'

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
    const customRenderSortTitle = (sortTitle: string, sortType: string) => {
      return (
        <div class="flex justify-end items-center">
          <div class="cursor-pointer" onClick={() => loopSwitchSortValue(sortType)}>
            {sortTitle}
          </div>
          {DataListParams && (
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

    const columns = computed<any[]>(() => {
      const extendColumns: any[] = []
      switch (DataListParams?.type) {
        case 1:
          // Hot pairs
          extendColumns.push({
            title: customRenderSortTitle('Views', 'views'),
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
            title: customRenderSortTitle('Age', 'age'),
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
          title: customRenderSortTitle('Price', 'price'),
          key: 'price',
          align: 'right'
        },
        {
          title: customRenderSortTitle('5m', '5m'),
          key: '5m',
          align: 'right',
          render: (data: DataItem, index: number) => {
            return <DynamicNumber value={data['5m'] + '%'} symbol={index % 2 ? 1 : -1} />
          }
        },
        {
          title: customRenderSortTitle('1h', '1h'),
          key: '1h',
          align: 'right',
          render: (data: DataItem, index: number) => {
            return <DynamicNumber value={data['1h'] + '%'} symbol={index % 2 ? 1 : -1} />
          }
        },
        {
          title: customRenderSortTitle('4h', '4h'),
          key: '4h',
          align: 'right',
          render: (data: DataItem, index: number) => {
            return <DynamicNumber value={data['4h'] + '%'} symbol={index % 2 ? 1 : -1} />
          }
        },
        {
          title: customRenderSortTitle('6h', '6h'),
          key: '6h',
          align: 'right',
          render: (data: DataItem, index: number) => {
            return <DynamicNumber value={data['6h'] + '%'} symbol={index % 2 ? 1 : -1} />
          }
        },
        {
          title: customRenderSortTitle('24h', '24h'),
          key: '24h',
          align: 'right',
          render: (data: DataItem, index: number) => {
            return <DynamicNumber value={data['24h'] + '%'} symbol={index % 2 ? 1 : -1} />
          }
        },
        {
          title: customRenderSortTitle('Txns', 'Txns'),
          key: 'Txns',
          align: 'right',
          render: (data: DataItem, index: number) => {
            return <strong class="text-color1">{data.Txns}</strong>
          }
        },
        {
          title: customRenderSortTitle('Buys', 'Buys'),
          key: 'Buys',
          align: 'right'
        },
        {
          title: customRenderSortTitle('Sells', 'Sells'),
          key: 'Sells',
          align: 'right'
        },
        {
          title: customRenderSortTitle('Vol', 'Vol'),
          key: 'Vol',
          align: 'right'
        },
        {
          title: customRenderSortTitle('Liquidity', 'Liquidity'),
          key: 'Liquidity',
          align: 'right',
          render: (data: DataItem, index: number) => {
            return <strong class="text-color1">{data.Liquidity}</strong>
          }
        },
        {
          title: customRenderSortTitle('FDV', 'FDV'),
          key: 'FDV',
          align: 'right'
        },
        {
          title: customRenderSortTitle('MKT Cap', 'MKTCap'),
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
          price: `$${formatMoney(Math.random() * 1e3)}`,
          views: formatBigNumber((Math.random() * 1e7).toFixed(0)),
          '5m': (Math.random() * 10).toFixed(2),
          '1h': (Math.random() * 10).toFixed(2),
          '4h': (Math.random() * 10).toFixed(2),
          '6h': (Math.random() * 10).toFixed(2),
          '24h': (Math.random() * 10).toFixed(2),
          Txns: formatBigNumber((Math.random() * 1e7).toFixed(0)),
          Buys: formatBigNumber((Math.random() * 1e7).toFixed(0)),
          Sells: formatBigNumber((Math.random() * 1e7).toFixed(0)),
          Vol: `$${formatMoney(Math.random() * Math.random() * 1e7)}`,
          Liquidity: `$${formatMoney(Math.random() * Math.random() * 1e7)}`,
          FDV: `$${formatMoney(Math.random() * Math.random() * 1e7)}`,
          MKTCap: `$${formatMoney(Math.random() * Math.random() * 1e7)}`,
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
