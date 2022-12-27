import { PlusOutlined } from '@wedex/icons'
import { defineComponent, ref } from 'vue'
import Editer from './components/Editer'

export type NotebookType = {
  content: string
  id: number | null
}

export default defineComponent({
  name: 'Notebook',
  setup() {
    const currentEdit = ref<NotebookType | null>(null)

    const handleSave = (item: NotebookType) => {
      console.log('handleSave', item)
      // TODO send request
      if (item.id) {
        // edit
      } else {
        // create
      }
      currentEdit.value = null
    }

    return {
      currentEdit,
      handleSave
    }
  },
  render() {
    return (
      <div class="flex flex-col h-full relative">
        <div class="border-color-border flex border-b-1 h-14 items-center">
          <strong class="flex-1 mx-5">Notebook</strong>
        </div>
        <div class="flex-1 p-3 overflow-y-auto">
          <div class="cursor-pointer flex text-primary text-xs py-3 select-none items-center hover:opacity-80">
            <div
              class={`flex items-center ${this.currentEdit ? 'cursor-not-allowed' : ''}`}
              onClick={() => !this.currentEdit && (this.currentEdit = { content: '', id: null })}
            >
              <PlusOutlined class="h-3 mr-1 w-3" />
              Add new list
            </div>
          </div>
          {this.currentEdit && (
            <Editer
              data={this.currentEdit}
              onChange={(item: NotebookType) => this.handleSave(item)}
              onCancel={() => (this.currentEdit = null)}
            />
          )}
        </div>
      </div>
    )
  }
})
