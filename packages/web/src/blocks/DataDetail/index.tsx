import { UTabs, UTabPane } from '@wedex/components'
import { SwapOutlined, ShareOutlined } from '@wedex/icons'
import { defineComponent, inject, Ref, watch, ref } from 'vue'
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

    return {
      currentExpand,
      widgetLoaded
    }
  },
  render() {
    return (
      <div
        class={`flex flex-col ${
          this.currentExpand === 'center' ? 'border-l-1 border-color-border' : ''
        }`}
      >
        <DetailHeader />
        {this.widgetLoaded ? <div class="bg-bg1 h-91.5">TradingView</div> : null}
        {this.widgetLoaded ? (
          <div class="border-color-border flex border-t-1 flex-1 overflow-hidden">
            <div style={{ flex: 2 }} class="border-color-border border-r-1">
              <UTabs
                bar-width={0}
                tabs-padding={10}
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
