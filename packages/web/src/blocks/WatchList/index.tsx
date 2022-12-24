import { ExpandOutlined, ReduceRightOutlined, SettingOutlined } from '@wedex/icons'
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
      <div class="relative">
        <div class="cursor-pointer top-0 left-0 absolute hover:text-primary" onClick={handleToggle}>
          {this.isExpand ? (
            <ReduceRightOutlined class={iconClass} />
          ) : (
            <ExpandOutlined class={iconClass} />
          )}
        </div>
        <div class="border-color-border flex border-b-1 h-14 items-center">
          <strong class="flex-1 mx-5">WatchList</strong>
          <span class="cursor-pointer px-1  text-color3 leading-0 hover:text-color1">
            <SettingOutlined class="h-4 w-4" />
          </span>
        </div>
      </div>
    )
  }
})
