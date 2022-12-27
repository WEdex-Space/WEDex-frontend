import { UAddress } from '@wedex/components'
import {
  WebsiteFilled,
  BountyFilled,
  TelegramFilled,
  DiscordFilled,
  TwitterFilled
} from '@wedex/icons'
import { defineComponent } from 'vue'
import { formatCurrency } from '@/utils/numberFormat'

const socialTagClass =
  'min-w-25 h-6 flex items-center px-2 text-color1 bg-bg3 rounded-sm hover:bg-primary-bg hover:text-primary cursor-pointer'
const socialIconClass = 'w-4 h-4 mr-2'

export default defineComponent({
  name: 'TokenInfoBlock',
  setup(props, ctx) {
    return {}
  },
  render() {
    return (
      <div class="border-color-border border-t-1 text-xs p-3">
        {/* base */}
        <div class="py-2 relative">
          <div class="flex mb-2">
            <div class="mr-1 text-color3">VaperNode</div>
            <div class="flex-1 text-color1 truncate">
              <strong>VPND</strong>
            </div>
          </div>
          <div class="flex mb-2">
            <div class="mr-1 text-color3">Total Supply:</div>
            <div class="flex-1 text-color1 truncate">{formatCurrency(312123412312)}</div>
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
                  address="0x5F4a6D6C4400e8E757C0c63a7a9e7F75b8Ee48F5"
                  blockchainExplorerUrl="https://cchain.explorer.avax-test.network"
                />
              </div>
            </div>
          </div>
          <div class="rounded-full bg-bg3 h-8 right-0 bottom-3 w-8 absolute">{/* LOGO */}</div>
        </div>
        {/* overview */}
        <div class="border-color-border border-t-1 border-b-1 py-5 text-color3">
          <div class="font-700 mb-2">Overview</div>
          Trader Joe is your one-stop decentralized trading platform on the Avalanche network.
        </div>
        {/* social */}
        <div class="flex py-5 gap-2">
          <div class={socialTagClass}>
            <WebsiteFilled class={socialIconClass} />
            Website
          </div>
          <div class={socialTagClass}>
            <BountyFilled class={socialIconClass} />
            Bounty
          </div>
          <div class={socialTagClass}>
            <TelegramFilled class={socialIconClass} />
            Telegram
          </div>
          <div class={socialTagClass}>
            <DiscordFilled class={socialIconClass} />
            Discord
          </div>
          <div class={socialTagClass}>
            <TwitterFilled class={socialIconClass} />
            Twitter
          </div>
        </div>
      </div>
    )
  }
})
