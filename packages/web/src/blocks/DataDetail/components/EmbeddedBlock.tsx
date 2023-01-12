import { useMouse } from '@vueuse/core'
import {
  SwapOutlined,
  ShareOutlined,
  ArrowDownDoubleOutlined,
  ArrowRightOutlined
} from '@wedex/icons'
import { defineComponent, ref, onMounted } from 'vue'
import PairActionBlock from '@/blocks/DataDetail/components/PairActionBlock'
import PoolBlock from '@/blocks/DataDetail/components/PoolBlock'
import TokenInfoBlock from '@/blocks/DataDetail/components/TokenInfoBlock'
import TradeBlock from '@/blocks/DataDetail/components/TradeBlock'
import { usePair } from '@/hooks'

export default defineComponent({
  name: 'DetailEmbeddedBlock',
  props: {
    pairId: {
      type: String
    }
  },
  setup(props, ctx) {
    const isStretch = ref(true)
    const Pair = usePair()

    const maxHeight = ref(0)

    const { x, y } = useMouse()
    const targetHeight = ref(360)
    const targetMouseCache = ref({
      x: 0,
      y: 0
    })
    const targetActive = ref(false)
    const targetEventProp = {
      onMousedown: (e: any) => {
        console.log(e.target.classList.contains('resize-handler'))
        if (e.target.classList.contains('resize-handler')) {
          targetMouseCache.value = {
            x: x.value,
            y: y.value
          }
          targetActive.value = true
        }
      },
      onMouseup: (e: any) => {
        targetMouseCache.value = {
          x: 0,
          y: 0
        }
        targetActive.value = false
      },
      onMouseleave: (e: any) => {
        targetMouseCache.value = {
          x: 0,
          y: 0
        }
        targetActive.value = false
      },
      onMousemove: () => {
        if (targetMouseCache.value.y) {
          if (targetHeight.value > maxHeight.value) {
            // max height
            targetHeight.value = maxHeight.value
          } else if (targetHeight.value < window.innerHeight * 0.2) {
            targetHeight.value = Math.ceil(window.innerHeight * 0.2)
          } else {
            targetHeight.value += targetMouseCache.value.y - y.value
            targetMouseCache.value = {
              x: x.value,
              y: y.value
            }
          }
        }
      }
    }

    onMounted(() => {
      maxHeight.value = window.innerHeight - 56
      targetHeight.value = maxHeight.value
    })

    return {
      isStretch,
      Pair,
      targetEventProp,
      targetHeight,
      targetActive
    }
  },
  render() {
    return (
      <div
        class="flex flex-col relative"
        style={{ maxHeight: `${this.targetHeight}px` }}
        {...this.targetEventProp}
      >
        {/* drag bar */}
        <div
          class={`h-3 transition-all top-0 right-0 left-0 absolute hover:opacity-60 ${
            this.targetActive ? '!bg-primary-bg' : ''
          }`}
        >
          <span
            class={`rounded-sm bg-bg1 h-1 -mt-0.5 -ml-8 top-[50%] left-[50%] w-16 absolute resize-handler`}
            style={{ cursor: 'n-resize' }}
          ></span>
        </div>
        <div class="flex-1 overflow-y-auto">
          <div class="border-color-border flex bg-bg3 border-t-1 h-11 px-3 items-center">
            <span class="bg-white rounded-full h-4 mr-1 w-4 overflow-hidden">
              <img src={this.Pair.current?.value?.network?.logo} class="h-full w-full" />
            </span>
            <span class="font-700 text-xs">{this.Pair.current?.value?.network?.name}</span>
            <ArrowRightOutlined class="h-3 mx-1 text-color3 w-3" />
            <span class="bg-white rounded-full h-4 mr-1 w-4 overflow-hidden">
              <img src={this.Pair.current?.value?.dex?.logo} class="h-full w-full" />
            </span>
            <span class="font-700 text-xs">{this.Pair.current?.value?.dex?.name}</span>
            <div class="flex-1"></div>
            <ArrowDownDoubleOutlined
              class={`cursor-pointer h-5 text-color1 hover:text-color3 transform transition ${
                this.isStretch ? '' : 'rotate-180'
              }`}
              onClick={() => (this.isStretch = !this.isStretch)}
            />
          </div>
          {this.isStretch ? (
            <>
              <TradeBlock />
              <PairActionBlock />
              <PoolBlock />
              <TokenInfoBlock pairId={this.pairId} />
            </>
          ) : null}
        </div>
        <div class="bg-primary-bg border-color-border cursor-pointer flex border-t-1 h-10 text-primary text-xs px-2.5 items-center hover:bg-primary hover:text-white">
          <SwapOutlined class="h-4 w-4" />
          <div class="flex-1">Trade on WEDex</div>
          <ShareOutlined class="h-4 w-4" />
        </div>
      </div>
    )
  }
})
