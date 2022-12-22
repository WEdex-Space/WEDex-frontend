import { ExpandOutlined, ReduceRightOutlined } from '@WEDex/icons'
import { defineComponent, inject, Ref, computed } from 'vue'

export default defineComponent({
  name: 'WatchList',
  setup() {
    const currentExpand = inject<Ref<'left' | 'center' | 'right'>>('currentExpand')
    const isExpand = computed(() => currentExpand?.value === 'right')

    return {
      isExpand,
      currentExpand
    }
  },
  render() {
    const handleToggle = () => {
      if (this.isExpand) {
        this.currentExpand = 'left'
      } else {
        this.currentExpand = 'right'
      }
    }

    const iconClass = 'h-5 p-0.5 w-5 hover:text-primary'

    return (
      <>
        <div class="cursor-pointer hover:text-primary" onClick={handleToggle}>
          {this.isExpand ? (
            <ReduceRightOutlined class={iconClass} />
          ) : (
            <ExpandOutlined class={iconClass} />
          )}
        </div>
        WatchList
      </>
    )
  }
})
