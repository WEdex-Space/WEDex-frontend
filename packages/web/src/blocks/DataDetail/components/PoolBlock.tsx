import { useTimeAgo } from '@vueuse/core'
import { UAddress } from '@wedex/components'
import { defineComponent, computed, inject } from 'vue'
import { timeRangeToSocketMap } from '@/blocks/DataDetail/util'
import { getNetByChainId } from '@/constants'
import { usePair } from '@/hooks'
import { DataListParamsKey } from '@/pages/index'
import { formatBigNumber } from '@/utils/numberFormat'

export default defineComponent({
  name: 'PoolBlock',
  setup(props, ctx) {
    const DataListParams = inject(DataListParamsKey)
    const Pair = usePair()

    const dataList = computed<any[]>(() =>
      Pair.detail.value
        ? [
            {
              label: 'Pool Liquidity',
              content:
                DataListParams && Pair.current?.value?.originSocketValue
                  ? formatBigNumber(
                      Pair.current?.value?.originSocketValue[
                        timeRangeToSocketMap(DataListParams.timeRange)
                      ].liquidity
                    )
                  : '--'
            },
            {
              label: 'Pair',
              content: (
                <UAddress
                  address={Pair.detail.value.pairAddress}
                  class="w-full text-color3"
                  blockchainExplorerUrl={
                    getNetByChainId(Pair.detail.value.chainId)?.explorerUrl + '/address/'
                  }
                />
              )
            },
            {
              label: 'Token0',
              content: (
                <UAddress
                  address={Pair.detail.value.tokenW0Info?.contractAddress}
                  class="w-full text-color3"
                  blockchainExplorerUrl={
                    getNetByChainId(Pair.detail.value.tokenW0Info.chainId)?.explorerUrl +
                    '/address/'
                  }
                />
              )
            },
            {
              label: 'Token1',
              content: (
                <UAddress
                  address={Pair.detail.value.tokenW1Info?.contractAddress}
                  class="w-full text-color3"
                  blockchainExplorerUrl={
                    getNetByChainId(Pair.detail.value.tokenW1Info.chainId)?.explorerUrl +
                    '/address/'
                  }
                />
              )
            },
            {
              label: 'Pooled Token0',
              content: Pair.detail.value.pairDetail.reserve0
            },
            {
              label: 'Pooled Token1',
              content: Pair.detail.value.pairDetail.reserve1
            },
            {
              label: 'Pair created',
              content: useTimeAgo(Pair.detail.value.createdAt * 1000).value
            }
          ]
        : []
    )

    return {
      Pair,
      dataList
    }
  },
  render() {
    return (
      <div class="text-xs py-2 px-3 leading-6">
        {this.dataList.map(item => (
          <div class="flex items-center">
            <div class="mr-1 text-color1">{item.label}:</div>
            <div class="flex-1 text-color3 truncate">{item.content}</div>
          </div>
        ))}
      </div>
    )
  }
})
