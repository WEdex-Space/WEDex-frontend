import { UInput } from '@wedex/components'
import { PlusOutlined } from '@wedex/icons'
import { defineComponent, ref, PropType } from 'vue'
import style from '@/blocks/DataView/components/HeaderTagFilter.module.css'

import { watchListType } from '@/blocks/WatchList/index'

export default defineComponent({
  name: 'HeaderTagFilter',
  props: {
    value: {
      type: String,
      default: ''
    },
    list: {
      type: Array as PropType<any[]>,
      default() {
        return [
          {
            name: 'Mainlist',
            value: ''
          }
        ]
      }
    }
  },
  emits: ['change'],
  setup(props, ctx) {
    const currentValue = ref(props.list[0].value)

    const handleClick = (value: any) => {
      currentValue.value = value
      ctx.emit('change', value)
    }

    // create list
    const createList = ref<watchListType[]>([])

    const handleSave = (item: watchListType) => {
      console.log('handleSave', item)
      // TODO send put request
      createList.value.splice(0, 1)
    }

    const handleCancelEdit = (item: watchListType) => {
      console.log('handleCancelEdit')
      createList.value.splice(0, 1)
    }

    const listWrapRef = ref()

    return {
      currentValue,
      handleClick,
      createList,
      handleSave,
      handleCancelEdit,
      listWrapRef
    }
  },
  render() {
    return (
      <div class="flex py-2 px-1 items-center">
        <div class="flex-1 overflow-hidden">
          <ul
            class="whitespace-nowrap overflow-x-scroll overflow-y-hidden"
            ref={ref => (this.listWrapRef = ref)}
          >
            {this.list.map(item => (
              <li
                class={[
                  style.subNavItem,
                  `${this.currentValue === item.value ? style.subNavItemCur : ''}`
                ]}
                onClick={() => this.handleClick(item.value)}
              >
                {item.name}
              </li>
            ))}
            {this.createList.map(item => (
              <li class={[style.subNavItem, 'w-30']}>
                <UInput
                  placeholder="List name"
                  size="tiny"
                  value={item.name}
                  autofocus
                  on-update:value={(value: string) => (item.name = value)}
                  onKeyup={(e: any) =>
                    e.key === 'Enter'
                      ? this.handleSave(item)
                      : e.key === 'Escape'
                      ? this.handleCancelEdit(item)
                      : null
                  }
                />
              </li>
            ))}
          </ul>
        </div>

        <PlusOutlined
          class="cursor-pointer h-5 text-color3 w-5 hover:text-color1"
          onClick={() => {
            if (!this.createList.length) {
              this.createList.push({ name: '', value: '' })
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
