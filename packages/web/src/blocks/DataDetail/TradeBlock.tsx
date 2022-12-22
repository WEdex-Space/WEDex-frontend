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
          return <div class="text-color3">{data['Stats']}</div>
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
        Stats: 'Volumn',
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
      <div>
        <div class="flex h-9 px-3 items-center">
          <div class="flex-1 font-700 text-primary">Trade</div>
          <div class="text-xs text-color3">BSC/pancakeSwap</div>
        </div>
        <ul class="border-color-border flex border-b-1 h-9 px-3 items-center">
          {this.tradeTimeTypes.map(time => (
            <li
              class={`cursor-pointer flex-1 text-color3 hover:text-color1 ${
                this.tradeTimeCurrent === time ? '!text-color1' : ''
              }`}
              onClick={() => this.handleClick(time)}
            >
              {time}
            </li>
          ))}
        </ul>
        <UTable
          class="transparentTable"
          columns={this.columns}
          data={this.dataList}
          size="small"
          bordered={false}
          single-column
          single-line
        />
      </div>
    )
  }
})
