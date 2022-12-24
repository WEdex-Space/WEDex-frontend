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
    const agoTime = ref(isNaN(Number(props.value)) ? 0 : Number(props.value))
    const timer = ref()

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
      result
    }
  },
  render() {
    return <div>{this.result}</div>
  }
})
