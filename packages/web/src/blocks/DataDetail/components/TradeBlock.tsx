import { UTable } from '@wedex/components'
import { defineComponent, ref } from 'vue'
import { formatCurrency, formatCurrencyWithUnit } from '@/utils/numberFormat'

export default defineComponent({
  name: 'TradeBlock',
  setup(props, ctx) {
    const tradeTimeTypes = ref(['5m', '1h', '4h', '6h', '24h', '7D'])
    const tradeTimeCurrent = ref(tradeTimeTypes.value[0])

    const handleClick = (time: string) => {
      tradeTimeCurrent.value = time
    }

    const columns = ref<any[]>([
      {
        title: 'Stats',
        key: 'Stats',
        align: 'left',
        render: (data: any, index: number) => {
          return <span>{data['Stats']}</span>
        }
      },
      {
        title: 'Total',
        key: 'Total',
        align: 'right'
      },
      {
        title: 'Buys',
        key: 'Buys',
        align: 'right',
        render: (data: any, index: number) => {
          return <div class="text-color-up">{data['Buys']}</div>
        }
      },
      {
        title: 'Sells',
        key: 'Sells',
        align: 'right',
        render: (data: any, index: number) => {
          return <div class="text-color-down">{data['Sells']}</div>
        }
      }
    ])

    const dataList = ref<any[]>([
      {
        Stats: 'Txns',
        Total: formatCurrency((Math.random() * 1e5).toFixed(0)),
        Buys: formatCurrency((Math.random() * 1e5).toFixed(0)),
        Sells: formatCurrency((Math.random() * 1e5).toFixed(0))
      },
      {
        Stats: 'Makers',
        Total: formatCurrency((Math.random() * 1e5).toFixed(0)),
        Buys: formatCurrency((Math.random() * 1e5).toFixed(0)),
        Sells: formatCurrency((Math.random() * 1e5).toFixed(0))
      },
      {
        Stats: 'Volume',
        Total: formatCurrencyWithUnit((Math.random() * 1e5).toFixed(0)),
        Buys: formatCurrencyWithUnit((Math.random() * 1e5).toFixed(0)),
        Sells: formatCurrencyWithUnit((Math.random() * 1e5).toFixed(0))
      },
      {
        Stats: 'Price.avg',
        Total: formatCurrencyWithUnit((Math.random() * 1e5).toFixed(0)),
        Buys: formatCurrencyWithUnit((Math.random() * 1e5).toFixed(0)),
        Sells: formatCurrencyWithUnit((Math.random() * 1e5).toFixed(0))
      }
    ])

    return {
      columns,
      dataList,
      tradeTimeTypes,
      tradeTimeCurrent,
      handleClick
    }
  },
  render() {
    return (
      <>
        <ul class="flex h-9 text-xs px-3 items-center">
          {this.tradeTimeTypes.map(time => (
            <li
              class={`cursor-pointer flex-1 text-color1 hover:text-color2 ${
                this.tradeTimeCurrent === time ? '!text-primary' : ''
              }`}
              onClick={() => this.handleClick(time)}
            >
              {time}
            </li>
          ))}
        </ul>
        <UTable
          class="transparentTable tinyTable"
          columns={this.columns}
          data={this.dataList}
          size="small"
          bordered={false}
          single-column
          single-line
        />
      </>
    )
  }
})
