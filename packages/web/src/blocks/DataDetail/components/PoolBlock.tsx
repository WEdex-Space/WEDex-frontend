import { useTimeAgo } from '@vueuse/core'
import { UAddress } from '@wedex/components'
import { defineComponent, computed, inject } from 'vue'
import { getNetByChainId } from '@/constants'
import { usePair } from '@/hooks'
import { DataListParamsKey } from '@/pages/index'
import { formatBigNumber } from '@/utils/numberFormat'

export default defineComponent({
  name: 'PoolBlock',
  setup(props, ctx) {
    const DataListParams = inject(DataListParamsKey)
    const Pair = usePair()

    const dataList = computed<any[]>(() => {
      const socketValue = Pair.current?.value?.pairReportIM
      const pariDetail = Pair.detail.value

      return pariDetail && DataListParams?.timeInterval && socketValue
        ? [
            {
              label: 'Pool Liquidity',
              content: formatBigNumber(socketValue.liquidity) || '--'
            },
            {
              label: 'Pair',
              content: (
                <UAddress
                  address={pariDetail.pairAddress}
                  class="w-full text-color3"
                  blockchainExplorerUrl={
                    getNetByChainId(pariDetail.chainId)?.explorerUrl + '/address/'
                  }
                />
              )
            },
            {
              label: Pair.current?.value?.tokenPair[0].symbol,
              content: (
                <UAddress
                  address={pariDetail.tokenW0Info?.contractAddress}
                  class="w-full text-color3"
                  blockchainExplorerUrl={
                    getNetByChainId(pariDetail.tokenW0Info.chainId)?.explorerUrl + '/address/'
                  }
                />
              )
            },
            {
              label: Pair.current?.value?.tokenPair[1].symbol,
              content: (
                <UAddress
                  address={pariDetail.tokenW1Info?.contractAddress}
                  class="w-full text-color3"
                  blockchainExplorerUrl={
                    getNetByChainId(pariDetail.tokenW1Info.chainId)?.explorerUrl + '/address/'
                  }
                />
              )
            },
            {
              label: `Pooled ${Pair.current?.value?.tokenPair[0].symbol}`,
              content: pariDetail.pairDetail.reserve0
            },
            {
              label: `Pooled ${Pair.current?.value?.tokenPair[1].symbol}`,
              content: pariDetail.pairDetail.reserve1
            },
            {
              label: 'Pair created',
              content: useTimeAgo(pariDetail.createdAt * 1000).value
            }
          ]
        : []
    })

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
