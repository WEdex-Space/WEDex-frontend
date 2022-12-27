import { UInput, UButton } from '@wedex/components'
import { defineComponent, ref, PropType } from 'vue'

import { NotebookType } from '@/blocks/Notebook/index'

export default defineComponent({
  name: 'NotebookEditer',
  props: {
    data: {
      type: Object as PropType<NotebookType>,
      require: true
    }
  },
  emits: ['change', 'cancel'],
  setup(props, ctx) {
    const inputValue = ref<string>(props.data?.content || '')

    const handleSave = () => {
      ctx.emit('change', {
        ...props.data,
        content: inputValue.value
      })
    }

    return {
      inputValue,
      handleSave
    }
  },
  render() {
    return (
      <div>
        <UInput
          value={this.inputValue}
          type="textarea"
          clearable
          rows={6}
          placeholder="Add your note details"
          onUpdate:value={(value: string) => (this.inputValue = value)}
        />
        <div class="flex mt-4 gap-2 justify-end">
          <UButton
            type="primary"
            ghost
            size="small"
            class="px-5"
            onClick={() => this.$emit('cancel')}
          >
            Cancel
          </UButton>
          <UButton
            type="primary"
            size="small"
            class="px-5 text-color1 !hover:text-color2"
            onClick={() => this.handleSave()}
          >
            Save
          </UButton>
        </div>
      </div>
    )
  }
})
