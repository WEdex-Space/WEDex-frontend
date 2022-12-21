import { UTooltip } from '@WEDex/components'
import { CopyOutlined } from '@WEDex/icons'
import copy from 'copy-to-clipboard'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true
    }
  },
  setup() {
    const showTooltipRef = ref<boolean>(false)
    return {
      showTooltipRef
    }
  },
  render() {
    return (
      <span
        class="u-address__copy"
        onClick={e => {
          e.stopPropagation()
          this.showTooltipRef = copy(this.content || '')
        }}
        onMouseleave={e => {
          e.stopPropagation()
          this.showTooltipRef = false
        }}
      >
        <UTooltip show={this.showTooltipRef}>
          {{
            trigger: () => <CopyOutlined class="u-address__icon w-4 mt-3px" />,
            default: () => 'Copied!'
          }}
        </UTooltip>
      </span>
    )
  }
})
