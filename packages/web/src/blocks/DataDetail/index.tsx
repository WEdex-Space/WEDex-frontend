import { useMouse } from '@vueuse/core'
import { defineComponent, inject, Ref, watch, ref, onMounted } from 'vue'
import DetailHeader from './DetailHeader'
import TradingView from './components/TradingView'
import TransactionsBlock from './components/TransactionsBlock'
import { usePair } from '@/hooks'

export default defineComponent({
  name: 'DataDetail',
  setup() {
    const Pair = usePair()
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
      onMousedown: (e: any) => {
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
          // Security Range: 10~90% window.innerHeight
          if (tradingViewHeight.value > window.innerHeight * 0.9) {
            tradingViewHeight.value = Math.floor(window.innerHeight * 0.9)
          } else if (tradingViewHeight.value < window.innerHeight * 0.2) {
            tradingViewHeight.value = Math.ceil(window.innerHeight * 0.2)
          } else {
            tradingViewHeight.value += y.value - targetMouseCache.value.y
            targetMouseCache.value = {
              x: x.value,
              y: y.value
            }
          }
        }
      }
    }

    watch([() => currentExpand?.value, () => Pair.detail.value], () => {
      timer.value && clearTimeout(timer.value)
      if (currentExpand?.value === 'center') {
        timer.value = setTimeout(() => {
          widgetLoaded.value = true
        }, 300)
      } else {
        widgetLoaded.value = false
      }
    })

    onMounted(() => {
      tradingViewHeight.value = Math.floor(window.innerHeight * 0.45)
    })

    const tabValue = ref('Transactions')

    return {
      tradingViewHeight,
      targetActive,
      currentPair: Pair.current,
      currentExpand,
      widgetLoaded,
      targetEventProp,
      tabValue
    }
  },
  render() {
    return (
      <div
        class={`flex flex-col ${
          this.currentExpand === 'center' ? 'border-l-1 border-color-border' : ''
        }`}
        {...this.targetEventProp}
      >
        <DetailHeader />
        {this.widgetLoaded ? (
          <TradingView style={{ height: this.tradingViewHeight + 'px' }} />
        ) : null}
        {this.widgetLoaded ? (
          <div class="border-color-border border-t-1 flex-1 overflow-hidden relative">
            {/* resize handler */}
            <div
              class={`h-2 w-full top-0 z-50 absolute hover:bg-bg3 resize-handler ${
                this.targetActive ? '!bg-primary-bg' : ''
              }`}
              style={{ cursor: 'n-resize' }}
            ></div>
            <div class="border-color-border flex flex-col h-full border-r-1">
              <TransactionsBlock pairId={this.currentPair?.id} />
            </div>
          </div>
        ) : null}
      </div>
    )
  }
})
