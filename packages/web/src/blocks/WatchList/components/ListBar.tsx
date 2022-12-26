import { PlusOutlined } from '@wedex/icons'
import { defineComponent, ref, PropType } from 'vue'
import style from '@/blocks/DataView/components/HeaderTagFilter.module.css'

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

    return {
      currentValue,
      handleClick
    }
  },
  render() {
    return (
      <div class="flex py-2 px-1 items-center">
        <div class="flex-1 overflow-hidden">
          <ul class=" whitespace-nowrap overflow-x-scroll overflow-y-hidden">
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
          </ul>
        </div>

        <PlusOutlined class="cursor-pointer h-5 text-color3 w-5 hover:text-color1" />
      </div>
    )
  }
})
