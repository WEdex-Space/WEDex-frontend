import { format } from 'timeago.js'
import { defineComponent, ref, PropType, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'TimeAgo',
  props: {
    value: {
      type: Number as PropType<string | number>
    }
  },
  setup(props) {
    const agoTime = ref(isNaN(Number(props.value)) ? 0 : Number(props.value))
    const timer = ref()

    const result = ref(format(agoTime.value, 'customTimeAgo'))

    onMounted(() => {
      setInterval(() => {
        result.value = format(agoTime.value, 'customTimeAgo')
      }, 1000)
    })

    onBeforeUnmount(() => {
      timer.value && clearInterval(timer.value)
    })

    return {
      result
    }
  },
  render() {
    return <div>{this.result}</div>
  }
})
