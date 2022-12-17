import { NumberDownFilled, NumberUpFilled } from '@wedex/icons'
import { defineComponent, ref, PropType } from 'vue'

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
    const longEnterEventRef = ref()

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

    const longEnterStart = (type: 'up' | 'down') => {
      longEnterEnd()
      longEnterEventRef.value = setInterval(() => {
        if (type === 'up') {
          triggerUp()
        } else {
          triggerDown()
        }
      }, 100)
    }
    const longEnterEnd = () => {
      clearInterval(longEnterEventRef.value)
    }

    return {
      triggerUp,
      triggerDown,
      longEnterStart,
      longEnterEnd
    }
  },
  render() {
    return (
      <div
        class="bg-purple flex flex-col h-6 w-4.5 items-center justify-center"
        style={{ lineHeight: 0 }}
      >
        <div
          class={`h-[10px] w-3 cursor-pointer hover:text-primary ${
            this.value === 'up' ? 'text-primary' : 'text-color1'
          }`}
          onMousedown={() => this.longEnterStart('up')}
          onMouseup={this.longEnterEnd}
          onMouseleave={this.longEnterEnd}
        >
          <NumberUpFilled class="h-full w-full" onClick={this.triggerUp} />
        </div>
        <div
          class={`h-[10px] w-3 cursor-pointer hover:text-primary ${
            this.value === 'down' ? 'text-primary' : 'text-color1'
          }`}
          onMousedown={() => this.longEnterStart('down')}
          onMouseup={this.longEnterEnd}
          onMouseleave={this.longEnterEnd}
        >
          <NumberDownFilled class="h-full w-full" onClick={this.triggerDown} />
        </div>
      </div>
    )
  }
})
