import { UInput } from '@wedex/components'
import { PlusOutlined } from '@wedex/icons'
import { defineComponent, ref, PropType } from 'vue'
import style from '@/blocks/DataView/components/HeaderTagFilter.module.css'

import { watchListItem } from '@/blocks/WatchList/index'

export default defineComponent({
  name: 'HeaderTagFilter',
  props: {
    current: {
      type: Number
    },
    list: {
      type: Array as PropType<watchListItem[]>,
      default: () => []
    }
  },
  emits: ['indexChange', 'createList'],
  setup(props, ctx) {
    // create list
    const createList = ref<watchListItem[]>([])

    const handleSave = (item: watchListItem) => {
      ctx.emit('createList', item)
      handleCancelEdit(item)
    }

    const handleCancelEdit = (item: watchListItem) => {
      createList.value.splice(0, 1)
    }

    const listWrapRef = ref()

    return {
      createList,
      handleSave,
      handleCancelEdit,
      listWrapRef
    }
  },
  render() {
    return (
      <div class="flex px-1 items-center">
        <div class="flex-1 overflow-hidden">
          <ul
            class="h-10 pt-2.5 whitespace-nowrap overflow-x-scroll  overflow-y-hidden"
            ref={ref => (this.listWrapRef = ref)}
          >
            {this.list.map((item, index) => (
              <li
                class={[style.subNavItem, `${this.current === index ? style.subNavItemCur : ''}`]}
                onClick={() => this.$emit('indexChange', index)}
              >
                {item.title}
              </li>
            ))}
            {this.createList.map(item => (
              <li class={[style.subNavItem, 'w-30']}>
                <UInput
                  placeholder="List name"
                  size="tiny"
                  value={item.title}
                  autofocus
                  on-update:value={(value: string) => (item.title = value)}
                  onKeyup={(e: any) =>
                    e.key === 'Enter'
                      ? this.handleSave(item)
                      : e.key === 'Escape'
                      ? this.handleCancelEdit(item)
                      : null
                  }
                  onBlur={() => !item.title && this.handleCancelEdit(item)}
                />
              </li>
            ))}
          </ul>
        </div>

        <PlusOutlined
          class="cursor-pointer h-5 text-color3 w-5 hover:text-color1"
          onClick={() => {
            if (!this.createList.length) {
              this.createList.push({ title: '', index: this.list.length })
              setTimeout(() => {
                this.listWrapRef.scrollLeft = this.listWrapRef.offsetWidth
              }, 0)
            }
          }}
        />
      </div>
    )
  }
})
