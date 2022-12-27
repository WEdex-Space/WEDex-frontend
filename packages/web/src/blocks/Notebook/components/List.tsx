import { useDateFormat } from '@vueuse/core'
import { PlusOutlined } from '@wedex/icons'
import { defineComponent, PropType, unref } from 'vue'
import { NotebookType } from '@/blocks/Notebook/index'
import SyncLink from '@/components/SyncLink'

export default defineComponent({
  name: 'NotebookList',
  props: {
    data: {
      type: Array as PropType<NotebookType[]>,
      require: true
    }
  },
  emits: ['create', 'edit'],
  setup(props, ctx) {
    return {}
  },
  render() {
    return (
      <div class="py-3">
        <div class="cursor-pointer flex text-primary text-xs p-3 select-none items-center hover:opacity-80">
          <div class={`flex items-center`} onClick={() => this.$emit('create')}>
            <PlusOutlined class="h-3 mr-1 w-3" />
            Add new list
          </div>
        </div>
        <ul class="min-h-10">
          {this.data?.map(item => (
            <li
              class="border-color-border cursor-pointer border-b-1 py-2 px-4 hover:bg-bg2"
              onClick={() => this.$emit('edit', item)}
            >
              <div class="mb-1 text-color1 truncate">{item.content}</div>
              <span class="text-xs text-color3">
                {unref(useDateFormat(item.createTime, 'MM/DD/YYYY'))}
              </span>
            </li>
          ))}
        </ul>
        <SyncLink />
      </div>
    )
  }
})
