import { UNoContent } from '@wedex/components'
import { EmptyFilled } from '@wedex/icons'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    createdByMe: {
      type: Boolean,
      default: () => true
    },
    text: {
      type: String,
      default: 'activity'
    }
  },
  setup(props) {
    const text = computed(() => props.text)
    return { text }
  },
  render() {
    return (
      <UNoContent textTip={`No ${this.text} yet`} class="my-10">
        <EmptyFilled class="-mb-14 max-w-60" />
      </UNoContent>
    )
  }
})
