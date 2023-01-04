import { StarOutlined, AlertOutlined, CalculatorOutlined, TwitterOutlined } from '@wedex/icons'
import { defineComponent, ref } from 'vue'

const iconClass = 'w-4 h-4 align-middle -mt-[2px]'

export default defineComponent({
  name: 'PairActionBlock',
  props: {
    pairId: {
      type: String
    }
  },
  setup(props, ctx) {
    const dataList = ref([
      {
        content: <StarOutlined class={iconClass} />,
        action() {
          console.log('StarOutlined')
        }
      },
      {
        content: <AlertOutlined class={iconClass} />,
        action() {
          console.log('AlertOutlined')
        }
      },
      {
        content: <CalculatorOutlined class={iconClass} />,
        action() {
          console.log('CalculatorOutlined')
        }
      },
      {
        content: <TwitterOutlined class={iconClass} />,
        action() {
          console.log('TwitterOutlined')
        }
      }
    ])

    return {
      dataList
    }
  },
  render() {
    return (
      <div class="border-color-border flex border-b-1 items-center">
        {this.dataList.map(item => (
          <div
            class="border-color-border cursor-pointer border-l-1 flex-1 h-7 text-center -ml-[1px] text-color3 leading-7 hover:text-color2"
            onClick={() => item.action()}
          >
            {item.content}
          </div>
        ))}
      </div>
    )
  }
})
