import { defineComponent, inject, ref } from 'vue'
import Portfolio from '@/blocks/Portfolio'
import Search from '@/blocks/Search'
import WatchList from '@/blocks/WatchList'

export default defineComponent({
  name: 'ExtentionBar',
  setup() {
    const currentExpand = inject<string>('currentExpand')
    const rightPanelState = inject<string>('rightPanelState')
    const currentExtention = ref<'Search' | 'WatchList' | 'Portfolio' | null>(null)

    return {
      currentExpand,
      rightPanelState,
      currentExtention
    }
  },
  render() {
    const componentsMap = {
      Search: <Search />,
      WatchList: <WatchList />,
      Portfolio: <Portfolio />
    }

    const showExtention = this.currentExpand === 'right' || this.rightPanelState === 'static'

    const toggleExtention = (name: 'Search' | 'WatchList' | 'Portfolio') => {
      if (this.currentExtention === name) {
        this.currentExtention = null
        this.rightPanelState = 'close'
      } else {
        this.currentExtention = name
        this.rightPanelState = 'static'
      }
    }

    return (
      <div class="flex">
        {showExtention && (
          <div class="flex-1">{this.currentExtention && componentsMap[this.currentExtention]}</div>
        )}
        <div class="w-15">
          {Object.keys(componentsMap).map((key: any) => (
            <div class="cursor-pointer" onClick={() => toggleExtention(key)}>
              {key}
            </div>
          ))}
        </div>
      </div>
    )
  }
})
