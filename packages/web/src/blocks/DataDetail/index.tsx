import { UTabs, UTabPane } from '@WEDex/components'
import { defineComponent, inject, Ref } from 'vue'
import DetailHeader from './DetailHeader'

export default defineComponent({
  name: 'DataDetail',
  setup() {
    const currentExpand = inject<Ref<'left' | 'center' | 'right'>>('currentExpand')

    return {
      currentExpand
    }
  },
  render() {
    return this.currentExpand === 'center' ? (
      <div
        class={`flex flex-col ${
          this.currentExpand === 'center' ? 'border-l-1 border-color-border' : ''
        }`}
      >
        <DetailHeader />
        <div class="bg-bg1 h-92">TradingView</div>
        <div class="border-color-border flex border-t-1 flex-1">
          <div style={{ flex: 2 }} class="border-color-border border-r-1">
            <UTabs animated bar-width={0} tabs-padding={10}>
              <UTabPane name="Transactions" tab="Transactions">
                Transactions
              </UTabPane>
              <UTabPane name="ProjectInfo" tab="Project Info">
                ProjectInfo
              </UTabPane>
              <UTabPane name="TokenInfo" tab="Token Info">
                TokenInfo
              </UTabPane>
            </UTabs>
          </div>
          <div style={{ flex: 1 }}>
            <div class="flex h-8 px-3 items-center">
              <div class="flex-1 font-700 text-primary">Trade</div>
              <div class="text-xs text-color3">BSC/pancakeSwap</div>
            </div>
          </div>
        </div>
      </div>
    ) : null
  }
})
