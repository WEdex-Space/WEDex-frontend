import { NumberDownFilled, NumberUpFilled } from '@wedex/icons'
import { defineComponent, PropType } from 'vue'

export type ControlSlotValueType = 'up' | 'down' | null

export default defineComponent({
  name: 'ControlSlot',
  props: {
    value: {
      type: String as PropType<ControlSlotValueType>
    }
  },
  emits: ['triggerUp', 'triggerDown', 'triggerClear'],
  setup(props, ctx) {
    const triggerUp = () => {
      if (props.value === 'up') {
        ctx.emit('triggerClear')
      } else {
        ctx.emit('triggerUp')
      }
    }

    const triggerDown = () => {
      if (props.value === 'down') {
        ctx.emit('triggerClear')
      } else {
        ctx.emit('triggerDown')
      }
    }

    return {
      triggerUp,
      triggerDown
    }
  },
  render() {
    return (
      <div
        class="bg-purple flex flex-col h-6 w-3 items-center justify-center"
        style={{ lineHeight: 0 }}
      >
        <div
          class={`h-3 leading-3 w-3 cursor-pointer hover:text-primary ${
            this.value === 'up' ? 'text-primary' : 'text-color1'
          }`}
          onClick={this.triggerUp}
        >
          <NumberUpFilled class="h-2 w-2 align-bottom" />
        </div>
        <div
          class={`h-3 leading-3 w-3 cursor-pointer hover:text-primary ${
            this.value === 'down' ? 'text-primary' : 'text-color1'
          }`}
          onClick={this.triggerDown}
        >
          <NumberDownFilled class="h-2 w-2 align-top" />
        </div>
      </div>
    )
  }
})
