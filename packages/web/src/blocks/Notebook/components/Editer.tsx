import { useDateFormat } from '@vueuse/core'
import { UInput, UButton } from '@wedex/components'
import { defineComponent, ref, PropType, unref, computed, onMounted } from 'vue'
import { NotebookType } from '@/blocks/Notebook/index'

export default defineComponent({
  name: 'NotebookEditer',
  props: {
    data: {
      type: Object as PropType<NotebookType>,
      require: true
    }
  },
  emits: ['save', 'cancel', 'delete'],
  setup(props, ctx) {
    const inputValue = ref<string>(props.data?.content || '')
    const inputRef = ref()
    const isCreate = computed(() => !props.data?.id)

    const handleSave = () => {
      ctx.emit('save', {
        ...props.data,
        content: inputValue.value
      })
    }

    onMounted(() => {
      inputRef.value && inputRef.value.focus()
    })

    return {
      inputRef,
      isCreate,
      inputValue,
      handleSave
    }
  },
  render() {
    return (
      <div class=" p-3">
        <div class="text-xs py-2 text-color3 select-none">
          {!this.isCreate && unref(useDateFormat(this.data?.createTime, 'MM/DD/YYYY HH:mm:ss'))}
        </div>
        <UInput
          ref={ref => (this.inputRef = ref)}
          value={this.inputValue}
          type="textarea"
          clearable
          rows={6}
          placeholder="Add your note details"
          autofocus
          onUpdate:value={(value: string) => (this.inputValue = value)}
        />
        <div class="flex mt-4 gap-2 ">
          {!this.isCreate && (
            <UButton
              type="error"
              quaternary
              size="small"
              class="px-5"
              onClick={() => this.$emit('delete')}
            >
              Delete
            </UButton>
          )}
          <div class="flex-1"></div>
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
