import { UAddress, USpin } from '@wedex/components'
import { ShareOutlined } from '@wedex/icons'
import { defineComponent, watch, ref, computed } from 'vue'
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

    const dataList = computed<any[]>(() => [
      {
        label: <strong>{info.value.currentToken.name}</strong>,
        content: <span>{info.value.currentToken.symbol}</span>
      },
      {
        label: 'Total Supply:',
        content: <strong>{formatCurrency(info.value.currentToken.totalSupply)}</strong>
      },
      {
        label: 'Holders:',
        content: <strong>{formatCurrency(312123412312)}</strong>
      },
      {
        label: 'Contract:',
        content: (
          <UAddress
            class="w-full"
            address={info.value.currentToken.contractAddress}
            blockchainExplorerUrl={
              getNetByChainId(info.value.currentToken.chainId)?.explorerUrl + '/address/'
            }
          />
        )
      }
    ])

    return {
      info,
      dataList
    }
  },
  render() {
    return (
      <div class="border-color-border border-t-1 text-xs min-h-20 py-2 px-3">
        <USpin show={!this.info}>
          {this.info ? (
            <>
              {/* base */}
              <div class="py-2 relative">
                {this.dataList.map(item => (
                  <div class="flex mb-2">
                    <div class="mr-1 text-color1">{item.label}</div>
                    <div class="flex-1 text-color3 truncate">{item.content}</div>
                  </div>
                ))}

                {/* token logo */}
                <div class="rounded-full bg-bg3 h-7 top-1 right-0 w-7 absolute overflow-hidden">
                  <img src={this.info.currentToken.logo} class="h-full w-full" />
                </div>
              </div>
              {/* overview */}
              <div class="text-color3">
                <div class="flex">
                  <div class="flex-1 font-700 mb-2 text-color1">Overview</div>
                  <a href="####" target="_blank" class="hover:text-primary">
                    Update
                    <ShareOutlined class="h-4 -mt-[2px] w-4 align-middle" />
                  </a>
                </div>
                {this.info.currentToken.description}
              </div>
              {/* social */}
              <div class="flex py-4 gap-2">
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
            </>
          ) : null}
        </USpin>
      </div>
    )
  }
})
