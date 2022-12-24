import { useNow, useDateFormat } from '@vueuse/core'
import { defineComponent, ref, PropType, onMounted, onBeforeUnmount } from 'vue'
import { customTimeAgo } from '@/utils/timeago'

export default defineComponent({
  name: 'TimeAgo',
  props: {
    value: {
      type: Number as PropType<string | number>
    }
  },
  setup(props) {
    const agoTime = ref(isNaN(Number(props.value)) ? useNow() : Number(props.value))
    const timer = ref()
    const formatted = useDateFormat(agoTime.value, 'YYYY-MM-DD HH:mm:ss')

    const result = ref(customTimeAgo(agoTime.value))

    onMounted(() => {
      setInterval(() => {
        result.value = customTimeAgo(agoTime.value)
      }, 1000)
    })

    onBeforeUnmount(() => {
      timer.value && clearInterval(timer.value)
    })

    return {
      result,
      formatted
    }
  },
  render() {
    return <div title={this.formatted}>{this.result}</div>
  }
})
