import { UAddress, USpin } from '@wedex/components'

import { defineComponent, watch, ref } from 'vue'
import SocialIcon from '@/components/SocialIcon'
import { getNetByChainId } from '@/constants'
import { usePair } from '@/hooks'
import { services } from '@/services'
import { formatCurrency } from '@/utils/numberFormat'

const socialTagClass =
  'min-w-25 h-6 flex items-center px-2 text-color1 bg-bg3 rounded-sm hover:bg-primary-bg hover:text-primary cursor-pointer'
const socialIconClass = 'w-4 h-4 mr-2'

export default defineComponent({
  name: 'TokenInfoBlock',
  props: {
    pairId: {
      type: String
    }
  },
  setup(props, ctx) {
    const Pair = usePair()
    const info = ref()

    const fetchData = async (pairId: string) => {
      const { error, data } = await services['Pair@get-pair-info']({
        pairId
      })
      if (!error) {
        info.value = {
          ...data,
          currentToken: [data.token0Info, data.token1Info].find(
            (item: any) => item.contractAddress === Pair.current?.value?.token[0].contractAddress
          )
        }
      }
    }

    watch(
      () => props.pairId,
      () => {
        if (props.pairId) {
          fetchData(props.pairId)
        }
      },
      {
        immediate: true
      }
    )

    return {
      info
    }
  },
  render() {
    return (
      <USpin show={!this.info}>
        {this.info ? (
          <div class="border-color-border border-t-1 text-xs p-3">
            {/* base */}
            <div class="py-2 relative">
              <div class="flex mb-2">
                <div class="mr-1 text-color3">{this.info.currentToken.name}</div>
                <div class="flex-1 text-color1 truncate">
                  <strong>{this.info.currentToken.symbol}</strong>
                </div>
              </div>
              <div class="flex mb-2">
                <div class="mr-1 text-color3">Total Supply:</div>
                <div class="flex-1 text-color1 truncate">
                  {formatCurrency(this.info.currentToken.totalSupply)}
                </div>
              </div>
              <div class="flex mb-2">
                <div class="mr-1 text-color3">Holders:</div>
                <div class="flex-1 text-color1 truncate">{formatCurrency(312123412312)}</div>
              </div>
              <div class="flex mb-2">
                <div class="mr-1 text-color3">Contract:</div>
                <div class="flex-1 text-color1 truncate">
                  <div class="flex">
                    <UAddress
                      address={this.info.currentToken.contractAddress}
                      blockchainExplorerUrl={
                        getNetByChainId(this.info.currentToken.chainId)?.explorerUrl + '/address/'
                      }
                    />
                  </div>
                </div>
              </div>
              <div class="rounded-full bg-bg3 h-8 right-0 bottom-3 w-8 absolute overflow-hidden">
                <img src={this.info.currentToken.logo} class="h-full w-full" />
              </div>
            </div>
            {/* overview */}
            <div class="border-color-border border-t-1 border-b-1 py-5 text-color3">
              <div class="font-700 mb-2">Overview</div>
              {this.info.currentToken.description}
            </div>
            {/* social */}
            <div class="flex py-5 gap-2">
              {this.info.currentToken.socials
                .map((social: any) => {
                  const socialInfo =
                    this.info.currentToken.socialTools.find(
                      (item: any) => item._id === social.socialToolId
                    ) || {}
                  return {
                    ...social,
                    ...socialInfo
                  }
                })
                .map((item: any) => (
                  <a href={item.value} target="_blank" class={socialTagClass}>
                    <SocialIcon icon={item.name} class={socialIconClass} />
                    {item.name}
                  </a>
                ))}
            </div>
          </div>
        ) : null}
      </USpin>
    )
  }
})
