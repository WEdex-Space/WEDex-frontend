import { defineComponent, watch, ref, nextTick, PropType } from 'vue'

export type ControlSlotValueType = 'up' | 'down' | null

export default defineComponent({
  name: 'DynamicNumber',
  props: {
    value: {
      type: String as PropType<string | number>
    },
    symbol: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const showShadow = ref(false)
    const timer = ref()

    watch(
      () => props.value,
      () => {
        if (showShadow.value) {
          showShadow.value = false
          timer.value && (timer.value = clearTimeout(timer.value))
        }
        nextTick(() => {
          showShadow.value = true
          timer.value = setTimeout(() => (showShadow.value = false), 800)
        })
      }
    )

    return {
      showShadow
    }
  },
  render() {
    const textColor = this.symbol > 0 ? 'text-color-up' : 'text-color-down'
    const shadowColor = this.symbol > 0 ? 'bg-color-up' : 'bg-color-down'
    const symbolStr = this.symbol > 0 ? '+' : '-'

    return (
      <div class={`relative p-1 overflow-hidden ${textColor}`}>
        {symbolStr}
        {this.value}
        {this.showShadow ? (
          <span
            class={`NumberPulse absolute top-0 right-0 bottom-0 bg-color-up ${shadowColor}`}
          ></span>
        ) : null}
      </div>
    )
  }
})
