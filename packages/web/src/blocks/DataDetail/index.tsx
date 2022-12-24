import { useMouse } from '@vueuse/core'
import { UTabs, UTabPane } from '@wedex/components'
import { SwapOutlined, ShareOutlined } from '@wedex/icons'
import { defineComponent, inject, Ref, watch, ref, onMounted } from 'vue'
import DetailHeader from './DetailHeader'
import PoolBlock from './components/PoolBlock'
import TradeBlock from './components/TradeBlock'
import TransactionsBlock from './components/TransactionsBlock'

export default defineComponent({
  name: 'DataDetail',
  setup() {
    const currentExpand = inject<Ref<'left' | 'center' | 'right'>>('currentExpand')
    const widgetLoaded = ref(false)
    const timer = ref()
    const { x, y } = useMouse()

    const tradingViewHeight = ref(360)

    const targetMouseCache = ref({
      x: 0,
      y: 0
    })

    const targetActive = ref(false)
    const targetEventProp = {
      onMousedown: () => {
        console.log('handleTargetMouseDown', x, y)
        targetMouseCache.value = {
          x: x.value,
          y: y.value
        }
        targetActive.value = true
      },
      onMouseup: () => {
        targetMouseCache.value = {
          x: 0,
          y: 0
        }
        targetActive.value = false
      },
      onMouseleave: () => {
        targetMouseCache.value = {
          x: 0,
          y: 0
        }
        targetActive.value = false
      },
      onMousemove: () => {
        setTimeout(() => {
          if (targetMouseCache.value.y) {
            tradingViewHeight.value += y.value - targetMouseCache.value.y
            targetMouseCache.value = {
              x: x.value,
              y: y.value
            }
          }
        }, 0)
      }
    }

    watch(
      () => currentExpand?.value,
      () => {
        timer.value && clearTimeout(timer.value)
        if (currentExpand?.value === 'center') {
          timer.value = setTimeout(() => {
            widgetLoaded.value = true
          }, 300)
        } else {
          setTimeout(() => {
            widgetLoaded.value = false
          }, 0)
        }
      }
    )

    onMounted(() => {
      tradingViewHeight.value = Math.floor(window.innerHeight * 0.45)
    })

    return {
      tradingViewHeight,
      targetActive,
      currentExpand,
      widgetLoaded,
      targetEventProp
    }
  },
  render() {
    return (
      <div
        class={`flex flex-col ${this.currentExpand ? 'border-l-1 border-color-border' : ''}`}
        {...this.targetEventProp}
      >
        <DetailHeader />
        {this.widgetLoaded ? (
          <div class={`bg-bg1`} style={{ height: this.tradingViewHeight + 'px' }}>
            TradingView
          </div>
        ) : null}
        {this.widgetLoaded ? (
          <div class="border-color-border flex border-t-1 flex-1 overflow-hidden relative">
            {/* resize handler */}
            <div
              class={`h-1 w-full top-0 z-50 absolute hover:bg-bg3 ${
                this.targetActive ? '!bg-primary-bg' : ''
              }`}
              style={{ cursor: 'n-resize' }}
            ></div>
            <div style={{ flex: 2 }} class="border-color-border border-r-1">
              <UTabs
                bar-width={0}
                tabs-padding={10}
                tab-style={{ userSelect: 'none' }}
                pane-style={{ padding: 0, flex: 1 }}
                class="flex flex-col h-full"
              >
                <UTabPane name="Transactions" tab="Transactions">
                  <TransactionsBlock />
                </UTabPane>
                <UTabPane name="ProjectInfo" tab="Project Info">
                  ProjectInfo
                </UTabPane>
                <UTabPane name="TokenInfo" tab="Token Info">
                  TokenInfo
                </UTabPane>
              </UTabs>
            </div>
            <div style={{ flex: 1 }} class="overflow-y-scroll">
              <TradeBlock />
              <PoolBlock />
              <div class="border-color-border cursor-pointer flex border-t-1 text-xs p-2.5 text-color3 items-center hover:text-primary">
                <SwapOutlined class="h-4 w-4" />
                <div class="flex-1">Trade on PancakeSwap</div>
                <ShareOutlined class="h-4 w-4" />
              </div>
              <div class="border-color-border cursor-pointer flex border-t-1 text-xs p-2.5 text-color3 items-center hover:text-primary">
                <SwapOutlined class="h-4 w-4" />
                <div class="flex-1">Trade on BogSwap</div>
                <ShareOutlined class="h-4 w-4" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
})
