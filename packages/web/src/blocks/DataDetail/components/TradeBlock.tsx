import { UTable } from '@wedex/components'
import { defineComponent, ref, computed } from 'vue'
import { usePair } from '@/hooks'
import { formatCurrency, formatCurrencyWithUnit, formatBigNumber } from '@/utils/numberFormat'
import { getTimeDataFromSocketValue } from '@/utils/trading'

export default defineComponent({
  name: 'TradeBlock',
  setup(props, ctx) {
    const Pair = usePair()
    const tradeTimeTypes = ref(['5m', '30m', '1h', '4h', '6h', '24h'])
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

    const dataList = computed<any[]>(() => {
      const socketValue = Pair.current?.value?.pairReportIM
      return [
        {
          Stats: 'Txns',
          Total: formatCurrency(
            getTimeDataFromSocketValue(socketValue, tradeTimeCurrent.value)?.txns?.total
          ),
          Buys: formatCurrency(
            getTimeDataFromSocketValue(socketValue, tradeTimeCurrent.value)?.txns?.buys
          ),
          Sells: formatCurrency(
            getTimeDataFromSocketValue(socketValue, tradeTimeCurrent.value)?.txns?.sells
          )
        },
        {
          Stats: 'Makers',
          Total: formatCurrency(
            getTimeDataFromSocketValue(socketValue, tradeTimeCurrent.value)?.makers?.total
          ),
          Buys: formatCurrency(
            getTimeDataFromSocketValue(socketValue, tradeTimeCurrent.value)?.makers?.buys
          ),
          Sells: formatCurrency(
            getTimeDataFromSocketValue(socketValue, tradeTimeCurrent.value)?.makers?.sells
          )
        },
        {
          Stats: 'Volume',
          Total: `$${formatBigNumber(
            getTimeDataFromSocketValue(socketValue, tradeTimeCurrent.value)?.volume?.total || 0
          )}`,
          Buys: `$${formatBigNumber(
            getTimeDataFromSocketValue(socketValue, tradeTimeCurrent.value)?.volume?.buys || 0
          )}`,
          Sells: `$${formatBigNumber(
            getTimeDataFromSocketValue(socketValue, tradeTimeCurrent.value)?.volume?.sells || 0
          )}`
        },
        {
          Stats: 'Price.avg',
          Total: formatCurrencyWithUnit(
            getTimeDataFromSocketValue(socketValue, tradeTimeCurrent.value)?.priceAvg?.total
          ),
          Buys: formatCurrencyWithUnit(
            getTimeDataFromSocketValue(socketValue, tradeTimeCurrent.value)?.priceAvg?.buys
          ),
          Sells: formatCurrencyWithUnit(
            getTimeDataFromSocketValue(socketValue, tradeTimeCurrent.value)?.priceAvg?.sells
          )
        }
      ]
    })

    return {
      Pair,
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
        <ul class="flex h-9 text-xs text-center px-3 items-center">
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
