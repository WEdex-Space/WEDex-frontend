import { UPopover } from '@wedex/components'
import { StarOutlined, StarFilled } from '@wedex/icons'
import { defineComponent, ref, inject, Ref, computed } from 'vue'
import { WatchListFunctionKey } from '@/blocks/WatchList/index'
import DynamicNumber from '@/components/DynamicNumber'
import { usePair, useCustomDataSync } from '@/hooks'
import { DataListParamsKey } from '@/pages/index'
import { formatBigNumber, formatCurrencyWithUnit } from '@/utils/numberFormat'
import { getTimeDataFromSocketValue } from '@/utils/trading'

export default defineComponent({
  name: 'DetailHeader',
  setup() {
    const DataListParams = inject(DataListParamsKey)
    const Pair = usePair()
    const currentExpand = inject<Ref<'left' | 'center' | 'right'>>('currentExpand')
    const tipRef = ref()
    // TODO watchlist
    const CustomData = useCustomDataSync(WatchListFunctionKey)

    const addToWatchList = (item: any, isInList?: boolean) => {
      if (isInList) {
        item.list = item.list.filter((e: any) => e.pairId !== Pair.current?.value?.id)
      } else {
        item.list = (item.list || []).concat({
          pairId: Pair.current?.value?.id
        })
      }

      CustomData.update(item)

      tipRef.value && tipRef.value.setShow?.(false)
    }

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
      currentExpand,
      tipRef,
      CustomData,
      addToWatchList,
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
        <UPopover
          ref={ref => (this.tipRef = ref)}
          trigger="click"
          placement="bottom"
          raw={true}
          arrowStyle={{ background: '#2C3138' }}
          v-slots={{
            trigger: () => {
              const isInWatch = this.CustomData.findListByPiarid(
                this.Pair.current?.value?.id
              )?.length
              return isInWatch ? (
                <StarFilled class="cursor-pointer font-700 h-6 text-primary text-color3 w-6 hover:text-primary" />
              ) : (
                <StarOutlined class={`cursor-pointer h-6 text-color3 w-6 hover:text-primary`} />
              )
            },
            default: () => (
              <div class="border border-color-border rounded bg-bg2 text-xs p-2 text-color3 w-40">
                <ul>
                  {(this.CustomData.list.value || []).map((item: any, index: number) => {
                    const isInList = this.CustomData.findListByPiarid(
                      this.Pair.current?.value?.id
                    )?.find((e: any) => e.id === item.id)
                    return (
                      <li
                        class={`h-8 flex items-center cursor-pointer hover:text-primary ${
                          isInList ? 'text-primary font-700' : ''
                        }`}
                        onClick={() => this.addToWatchList(item, isInList)}
                      >
                        {isInList ? (
                          <StarFilled class="h-4 mr-1 w-4" />
                        ) : (
                          <StarOutlined class="h-4 mr-1 w-4" />
                        )}
                        {item.title}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          }}
        />
      </div>
    )
  }
})
