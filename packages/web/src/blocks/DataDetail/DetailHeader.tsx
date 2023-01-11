import { defineComponent, inject, computed } from 'vue'
import AddToWatchList from '@/components/AddToWatchList'
import DynamicNumber from '@/components/DynamicNumber'
import { usePair } from '@/hooks'
import { DataListParamsKey } from '@/pages/index'
import { formatBigNumber, formatCurrencyWithUnit } from '@/utils/numberFormat'
import { getTimeDataFromSocketValue } from '@/utils/trading'

export default defineComponent({
  name: 'DetailHeader',
  setup() {
    const DataListParams = inject(DataListParamsKey)
    const Pair = usePair()

    const headerCellData = computed(() => {
      const socketValue = Pair.current?.value?.pairReportIM

      return DataListParams && socketValue
        ? [
            {
              label: 'Price USD',
              value: (
                <span class="text-color1">
                  $
                  {formatBigNumber(
                    getTimeDataFromSocketValue(socketValue, DataListParams.timeInterval)
                      ?.priceUSD || '--'
                  )}
                </span>
              )
            },
            {
              label: 'Price',
              value: (
                <span class="text-color1">
                  {formatBigNumber(
                    getTimeDataFromSocketValue(socketValue, DataListParams.timeInterval)?.price ||
                      '--'
                  ) +
                    ' ' +
                    Pair.current?.value?.tokenPair[1].symbol}
                </span>
              )
            },
            {
              label: '5m',
              value: (
                <DynamicNumber
                  value={
                    (getTimeDataFromSocketValue(socketValue, '5m')?.priceChange || 0) * 100 + '%'
                  }
                  symbol={Math.floor(Math.random() * 10) % 2 ? 1 : -1}
                />
              )
            },
            {
              label: '1h',
              value: (
                <DynamicNumber
                  value={
                    (getTimeDataFromSocketValue(socketValue, '1h')?.priceChange || 0) * 100 + '%'
                  }
                  symbol={Math.floor(Math.random() * 10) % 2 ? 1 : -1}
                />
              )
            },
            {
              label: '6h',
              value: (
                <DynamicNumber
                  value={
                    (getTimeDataFromSocketValue(socketValue, '6h')?.priceChange || 0) * 100 + '%'
                  }
                  symbol={Math.floor(Math.random() * 10) % 2 ? 1 : -1}
                />
              )
            },
            {
              label: '24h',
              value: (
                <DynamicNumber
                  value={
                    (getTimeDataFromSocketValue(socketValue, '24h')?.priceChange || 0) * 100 + '%'
                  }
                  symbol={Math.floor(Math.random() * 10) % 2 ? 1 : -1}
                />
              )
            },
            {
              label: '24h High',
              value: (
                <span class="text-color1">
                  {formatCurrencyWithUnit(
                    getTimeDataFromSocketValue(socketValue, '24h')?.priceHigh
                  )}
                </span>
              )
            },
            {
              label: '24h Low',
              value: (
                <span class="text-color1">
                  {formatCurrencyWithUnit(getTimeDataFromSocketValue(socketValue, '24h')?.priceLow)}
                </span>
              )
            }
          ]
        : []
    })

    return {
      Pair,
      headerCellData
    }
  },
  render() {
    return (
      <div class="border-color-border flex border-b-1 h-14 px-2.5 items-center">
        <div>
          <div class="font-700 text-base text-color1">
            {this.Pair?.current?.value?.tokenPair[0].symbol}/
            {this.Pair?.current?.value?.tokenPair[1].symbol}
          </div>
          <div class="text-color3">{this.Pair?.current?.value?.tokenPair[0].name}</div>
        </div>
        <div class="flex h-full flex-1 mx-6 text-right text-xs overflow-x-scroll items-center">
          {this.headerCellData.map(item => (
            <div class="px-3">
              <div class="text-color3">{item.label}</div>
              {item.value}
            </div>
          ))}
        </div>
        {this.Pair.current?.value?.id && <AddToWatchList pairId={this.Pair.current?.value?.id} />}
      </div>
    )
  }
})
