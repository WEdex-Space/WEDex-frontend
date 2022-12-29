import { useMouse } from '@vueuse/core'
import { UTabs, UTabPane } from '@wedex/components'
import { ExportOutlined } from '@wedex/icons'
import { defineComponent, inject, Ref, watch, ref, onMounted } from 'vue'
import DetailHeader from './DetailHeader'
import TokenInfoBlock from './components/TokenInfoBlock'
import TradingView from './components/TradingView'
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
          widgetLoaded.value = false
        }
      }
    )

    onMounted(() => {
      tradingViewHeight.value = Math.floor(window.innerHeight * 0.45)
    })

    const tabValue = ref('Transactions')

    return {
      tradingViewHeight,
      targetActive,
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
              class={`h-1 w-full top-0 z-50 absolute hover:bg-bg3 resize-handler ${
                this.targetActive ? '!bg-primary-bg' : ''
              }`}
              style={{ cursor: 'n-resize' }}
            ></div>
            <UTabs
              bar-width={0}
              tabs-padding={10}
              tab-style={{ userSelect: 'none' }}
              pane-style={{ padding: 0, flex: 1 }}
              class="border-color-border flex flex-col h-full border-r-1"
              value={this.tabValue}
              onUpdate:value={value => (this.tabValue = value)}
              v-slots={{
                suffix: () =>
                  this.tabValue === 'Transactions' ? (
                    <div class="cursor-pointer flex text-xs px-2 text-color3 items-center hover:text-color1">
                      <ExportOutlined class="h-4 mr-1 w-3" /> Export
                    </div>
                  ) : null
              }}
            >
              <UTabPane name="Transactions" tab="Transactions">
                <TransactionsBlock />
              </UTabPane>
              <UTabPane name="TokenInfo" tab="Token Info">
                <TokenInfoBlock />
              </UTabPane>
            </UTabs>
          </div>
        ) : null}
      </div>
    )
  }
})
