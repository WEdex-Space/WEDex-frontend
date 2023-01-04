import { UTable } from '@wedex/components'
import { defineComponent, ref } from 'vue'
import { timeRangeToSocketMap } from '@/blocks/DataDetail/util'
import { usePair } from '@/hooks'
import { formatCurrency, formatCurrencyWithUnit } from '@/utils/numberFormat'

export default defineComponent({
  name: 'TradeBlock',
  setup(props, ctx) {
    const Pair = usePair()
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
        Total: formatCurrency(
          Pair.current?.value?.originSocketValue[timeRangeToSocketMap(tradeTimeCurrent.value)].txns
        ),
        Buys: formatCurrency(
          Pair.current?.value?.originSocketValue[timeRangeToSocketMap(tradeTimeCurrent.value)]
            .txnsBuys
        ),
        Sells: formatCurrency(
          Pair.current?.value?.originSocketValue[timeRangeToSocketMap(tradeTimeCurrent.value)]
            .txnsSells
        )
      },
      {
        Stats: 'Makers',
        Total: formatCurrency(
          Pair.current?.value?.originSocketValue[timeRangeToSocketMap(tradeTimeCurrent.value)]
            .makers
        ),
        Buys: formatCurrency(
          Pair.current?.value?.originSocketValue[timeRangeToSocketMap(tradeTimeCurrent.value)]
            .makersBuys
        ),
        Sells: formatCurrency(
          Pair.current?.value?.originSocketValue[timeRangeToSocketMap(tradeTimeCurrent.value)]
            .makersSells
        )
      },
      {
        Stats: 'Volume',
        Total: formatCurrencyWithUnit(
          Pair.current?.value?.originSocketValue[timeRangeToSocketMap(tradeTimeCurrent.value)]
            .volume
        ),
        Buys: formatCurrencyWithUnit(
          Pair.current?.value?.originSocketValue[timeRangeToSocketMap(tradeTimeCurrent.value)]
            .volumeBuys
        ),
        Sells: formatCurrencyWithUnit(
          Pair.current?.value?.originSocketValue[timeRangeToSocketMap(tradeTimeCurrent.value)]
            .volumeSells
        )
      },
      {
        Stats: 'Price.avg',
        Total: formatCurrencyWithUnit(
          Pair.current?.value?.originSocketValue[timeRangeToSocketMap(tradeTimeCurrent.value)]
            .priceAvg
        ),
        Buys: formatCurrencyWithUnit(
          Pair.current?.value?.originSocketValue[timeRangeToSocketMap(tradeTimeCurrent.value)]
            .priceAvgBuys
        ),
        Sells: formatCurrencyWithUnit(
          Pair.current?.value?.originSocketValue[timeRangeToSocketMap(tradeTimeCurrent.value)]
            .priceAvgSells
        )
      }
    ])

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
