import { useUpload, message, UTooltip } from '@WEDex/components'
import { TwitterFilled, CopyOutlined } from '@WEDex/icons'
import { defineComponent, ref, PropType } from 'vue'
import { GenerateShareImage, infoItem } from './'
import { useShare } from '@/hooks'

type generate = {
  banner: string
  logo: string
  name: string
  infos?: infoItem[]
  content?: string
  noShadow?: boolean
}

export const ShareButtonClass = `rounded-full cursor-pointer bg-[#F0F0F0] h-6 text-center leading-7 w-6 hover:text-primary hover:bg-white hover:shadow`

export default defineComponent({
  name: 'ShareButtonGroup',
  props: {
    generate: {
      type: Object as PropType<generate>,
      required: true
    },
    route: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    text: {
      type: String
    },
    tags: {
      type: String
    },
    copyText: {
      type: String
    },
    tipPlacement: {
      type: String as PropType<any>,
      default: 'left'
    }
  },
  setup(props) {
    const GenerateRef = ref()
    const { onUpload } = useUpload()
    const { shareToTwitter, copyText } = useShare()

    const handleShareToTwitter = () => {
      if (GenerateRef.value) {
        GenerateRef.value
          .generate({
            imageUrl: props.generate.banner,
            logoUrl: props.generate.logo,
            title: props.generate.name,
            infos: props.generate.infos,
            content: props.generate.content
          })
          .then((imageFile: File) => {
            console.log('got imageFile', imageFile)
            let shareUrl = props.route
            if (
              location.host.indexOf('127.0.0.1') !== -1 &&
              shareUrl.indexOf(location.host) !== -1
            ) {
              shareUrl = shareUrl.replace(location.host, `${import.meta.env.VITE_HOST}`)
            }
            onUpload(imageFile, () => null).then(url => {
              if (url) {
                shareToTwitter({
                  image: url,
                  route: shareUrl,
                  title: props.title,
                  description: props.description,
                  text: props.text,
                  tags: props.tags
                })
              }
            })
          })
      } else {
        console.warn('GenerateRef is unset!')
      }
    }

    const handleCopy = () => {
      if (
        copyText({
          text: props.copyText || props.text + window.location.href
        })
      ) {
        message.success('Successfully copy.')
      }
    }

    return {
      GenerateRef,
      handleShareToTwitter,
      handleCopy
    }
  },
  render() {
    return (
      <div class="flex flex-col px-4 text-color2 gap-2">
        <UTooltip
          placement={this.tipPlacement}
          v-slots={{
            trigger: () => (
              <div class={ShareButtonClass} onClick={this.handleShareToTwitter}>
                <TwitterFilled />
              </div>
            ),
            default: () => `Share to Twitter`
          }}
        ></UTooltip>

        <GenerateShareImage ref={(ref: any) => (this.GenerateRef = ref)} />

        <UTooltip
          placement={this.tipPlacement}
          v-slots={{
            trigger: () => (
              <div class={ShareButtonClass} onClick={this.handleCopy}>
                <CopyOutlined />
              </div>
            ),
            default: () => `Copy Link`
          }}
        ></UTooltip>

        {this.$slots.default ? this.$slots.default() : null}
      </div>
    )
  }
})
