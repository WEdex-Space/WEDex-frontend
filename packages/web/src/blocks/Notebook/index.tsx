import { USpin } from '@wedex/components'
import { defineComponent, ref, Ref } from 'vue'
import Editer from './components/Editer'
import List from './components/List'
import { useCustomDataSync } from '@/hooks'

export type NotebookType = {
  id?: number
  content: string
  updateTime?: number
}

export const FunctionKey = 'notebook-data'

export default defineComponent({
  name: 'Notebook',
  setup() {
    const currentEdit = ref<NotebookType | null>(null)
    const CustomData = useCustomDataSync(FunctionKey)

    const dataList: Ref<NotebookType[] | undefined> = CustomData.list

    return {
      currentEdit,
      dataList,
      CustomData
    }
  },
  render() {
    return (
      <div class="flex flex-col h-full relative">
        <div class="border-color-border flex border-b-1 h-14 items-center overflow-hidden">
          <strong class="flex-1 mx-5">Notebook</strong>
        </div>
        <div class="flex-1 overflow-y-auto">
          <USpin show={this.CustomData.loading.value}>
            {this.currentEdit ? (
              <Editer
                data={this.currentEdit}
                onCreate={item => {
                  this.CustomData.add(item)
                  this.currentEdit = null
                }}
                onEdit={item => {
                  this.CustomData.update(item)
                  this.currentEdit = null
                }}
                onDelete={item => {
                  this.CustomData.remove(item)
                  this.currentEdit = null
                }}
                onCancel={() => (this.currentEdit = null)}
              />
            ) : (
              <List
                data={this.dataList}
                onCreate={() => (this.currentEdit = { content: '' })}
                onEdit={item => (this.currentEdit = item)}
              />
            )}
          </USpin>
        </div>
      </div>
    )
  }
})
