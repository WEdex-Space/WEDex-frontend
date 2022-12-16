import { UTable } from '@wedex/components'
import { StarOutlined } from '@wedex/icons'
import { defineComponent, ref, onMounted } from 'vue'
import { default as ControlSlot, ControlSlotValueType } from './ControlSlot'
import DynamicNumber from './DynamicNumber'

export default defineComponent({
  name: 'DataList',
  setup() {
    const formData = ref<{
      sortLabel: string | null
      sortMethod: ControlSlotValueType
    }>({
      sortLabel: null,
      sortMethod: null
    })

    const columns = ref([
      {
        title: '#',
        key: 'index',
        render: (_, index: number) => {
          return (
            <div class="flex text-color3 items-center">
              <StarOutlined class="cursor-pointer h-4 mr-2 w-4 hover:text-primary" />
              <div>{`${index + 1}`}</div>
            </div>
          )
        }
      },
      {
        title: 'Token',
        key: 'token'
      },
      {
        title() {
          return (
            <div class="flex justify-end">
              <div>Price</div>
              <ControlSlot
                value={formData.value.sortMethod}
                onTriggerUp={() => {
                  formData.value.sortLabel = 'price'
                  formData.value.sortMethod = 'up'
                }}
                onTriggerDown={() => {
                  formData.value.sortLabel = 'price'
                  formData.value.sortMethod = 'down'
                }}
                onTriggerClear={() => {
                  formData.value.sortLabel = null
                  formData.value.sortMethod = null
                }}
              />
            </div>
          )
        },
        key: 'price',
        align: 'right'
      },
      {
        title: '5m',
        key: '5m',
        align: 'right',
        render: (data, index) => {
          return <DynamicNumber value={data['5m']} symbol={index % 2 ? 1 : -1} />
        }
      },
      {
        title: '1h',
        key: '1h',
        align: 'right',
        render: (data, index) => {
          return <DynamicNumber value={data['1h']} symbol={index % 2 ? 1 : -1} />
        }
      },
      {
        title: '4h',
        key: '4h',
        align: 'right',
        render: (data, index) => {
          return <DynamicNumber value={data['4h']} symbol={index % 2 ? 1 : -1} />
        }
      },
      {
        title: '6h',
        key: '6h',
        align: 'right',
        render: (data, index) => {
          return <DynamicNumber value={data['6h']} symbol={index % 2 ? 1 : -1} />
        }
      },
      {
        title: '24h',
        key: '24h',
        align: 'right',
        render: (data, index) => {
          return <DynamicNumber value={data['24h']} symbol={index % 2 ? 1 : -1} />
        }
      },
      {
        title: 'Txns',
        key: 'Txns',
        align: 'right'
      },
      {
        title: 'Buys',
        key: 'Buys',
        align: 'right'
      },
      {
        title: 'Sells',
        key: 'Sells',
        align: 'right'
      },
      {
        title: 'Vol',
        key: 'Vol',
        align: 'right'
      },
      {
        title: 'Liquidity',
        key: 'Liquidity',
        align: 'right'
      },
      {
        title: 'FDV',
        key: 'FDV',
        align: 'right'
      },
      {
        title: 'MKT Cap',
        key: 'MKTCap',
        align: 'right'
      }
    ])

    const dataList = ref<any[]>([])

    const fetchData = function () {
      const data = new Array(10).fill(null).map((e, i) => {
        return {
          index: i,
          token: `token_${i}`,
          price: (Math.random() * 10).toFixed(2),
          '5m': (Math.random() * 10).toFixed(2),
          '1h': (Math.random() * 10).toFixed(2),
          '4h': (Math.random() * 10).toFixed(2),
          '6h': (Math.random() * 10).toFixed(2),
          '24h': (Math.random() * 10).toFixed(2),
          Txns: (Math.random() * 1000).toFixed(2),
          Buys: (Math.random() * 1000).toFixed(2),
          Sells: (Math.random() * 1000).toFixed(2),
          Vol: (Math.random() * 1000).toFixed(2),
          Liquidity: (Math.random() * 1000).toFixed(2),
          FDV: (Math.random() * 1000).toFixed(2),
          MKTCap: (Math.random() * 1000).toFixed(2)
        }
      })
      dataList.value = data
      // test
      setTimeout(fetchData, 5000 * Math.random())
    }

    onMounted(() => {
      fetchData()
    })

    return {
      columns,
      dataList,
      formData
    }
  },
  render() {
    return (
      <UTable
        columns={this.columns}
        data={this.dataList}
        flex-height
        size="small"
        bordered={false}
      />
    )
  }
})
