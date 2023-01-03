import { UTooltip } from '@wedex/components'
import {
  DiscordFilled,
  WebsiteFilled,
  FacebookFilled,
  TelegramFilled,
  TwitterFilled,
  EmailFilled,
  YoutubeFilled,
  GithubFilled
} from '@wedex/icons'
import copy from 'copy-to-clipboard'
import { defineComponent, ref } from 'vue'
import { validateDiscordUsername } from '@/utils/valid'

export default defineComponent({
  name: 'SocialIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    address: {
      type: String,
      default: () => ''
    },
    disable: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props) {
    const showTooltipRef = ref<boolean>(false)

    const asyncComponent = function (type: string) {
      return (
        {
          Website: <WebsiteFilled class={`w-full h-full`} />,
          Discord: <DiscordFilled class={`w-full h-full`} />,
          Facebook: <FacebookFilled class={`w-full h-full`} />,
          Telegram: <TelegramFilled class={`w-full h-full`} />,
          Twitter: <TwitterFilled class={`w-full h-full`} />,
          Email: <EmailFilled class={`w-full h-full`} />,
          Youtube: <YoutubeFilled class={`w-full h-full`} />,
          Github: <GithubFilled class={`w-full h-full`} />
        }[type] || <WebsiteFilled class={`w-full h-full`} />
      )
    }

    return {
      showTooltipRef,
      asyncComponent
    }
  },
  render() {
    return (
      <div title={this.address || this.icon}>
        {this.address ? (
          <>
            {this.icon === 'Discord' && !!validateDiscordUsername(this.address) ? (
              <span
                onClick={e => {
                  e.stopPropagation()
                  this.showTooltipRef = copy(this.address)
                }}
                onMouseleave={e => {
                  e.stopPropagation()
                  this.showTooltipRef = false
                }}
              >
                <UTooltip show={this.showTooltipRef}>
                  {{
                    trigger: () => this.asyncComponent(this.icon),
                    default: () => 'Copied!'
                  }}
                </UTooltip>
              </span>
            ) : (
              <a href={`${this.icon === 'Email' ? 'mailto:' : ''}${this.address}`} target="_blank">
                {this.asyncComponent(this.icon)}
              </a>
            )}
          </>
        ) : (
          this.asyncComponent(this.icon)
        )}
      </div>
    )
  }
})
