import { UTooltip } from '@wedex/components'
import {
  DiscordFilled,
  WebsiteFilled,
  FacebookFilled,
  TelegramFilled,
  TwitterFilled,
  EmailFilled,
  YoutubeFilled,
  GithubFilled,
  MediumFilled,
  InstagramFilled,
  BitcointalkFilled,
  RedditFilled
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
          website: <WebsiteFilled class={`w-full h-full`} />,
          medium: <MediumFilled class={`w-full h-full`} />,
          discord: <DiscordFilled class={`w-full h-full`} />,
          instagram: <InstagramFilled class={`w-full h-full`} />,
          facebook: <FacebookFilled class={`w-full h-full`} />,
          telegram: <TelegramFilled class={`w-full h-full`} />,
          bitcointalk: <BitcointalkFilled class={`w-full h-full`} />,
          twitter: <TwitterFilled class={`w-full h-full`} />,
          email: <EmailFilled class={`w-full h-full`} />,
          youtube: <YoutubeFilled class={`w-full h-full`} />,
          reddit: <RedditFilled class={`w-full h-full`} />,
          github: <GithubFilled class={`w-full h-full`} />
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
            {this.icon === 'discord' && !!validateDiscordUsername(this.address) ? (
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
              <a href={`${this.icon === 'email' ? 'mailto:' : ''}${this.address}`} target="_blank">
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
