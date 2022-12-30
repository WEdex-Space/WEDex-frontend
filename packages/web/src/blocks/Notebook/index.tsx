import { defineComponent, ref, onMounted } from 'vue'
import Editer from './components/Editer'
import List from './components/List'

export type NotebookType = {
  content: string
  id?: number
  createTime?: number
}

export default defineComponent({
  name: 'Notebook',
  setup() {
    const currentEdit = ref<NotebookType | null>(null)
    const dataList = ref<NotebookType[]>([])

    const fetchData = () => {
      dataList.value = new Array(4).fill(null).map(e => {
        // test
        const random = Math.floor(Math.random() * 1e5)
        return {
          content: `${random} lb;kgds ssfsdf pp ljlsd ksjflsd s fpsk sd; s ds s fds  yio;.kjq`,
          id: random,
          createTime: new Date().getTime() - random
        }
      })
    }

    onMounted(() => {
      fetchData()
    })

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

    const handleDelete = () => {
      console.log('handleDelete')
      if (currentEdit.value?.id) {
        // TODO send request
      }

      currentEdit.value = null
    }

    return {
      currentEdit,
      dataList,
      handleSave,
      handleDelete
    }
  },
  render() {
    return (
      <div class="flex flex-col h-full relative">
        <div class="border-color-border flex border-b-1 h-14 items-center overflow-hidden">
          <strong class="flex-1 mx-5">Notebook</strong>
        </div>
        <div class="flex-1 overflow-y-auto">
          {this.currentEdit ? (
            <Editer
              data={this.currentEdit}
              onSave={(item: NotebookType) => this.handleSave(item)}
              onCancel={() => (this.currentEdit = null)}
              onDelete={this.handleDelete}
            />
          ) : (
            <List
              data={this.dataList}
              onCreate={() => (this.currentEdit = { content: '' })}
              onEdit={item => (this.currentEdit = item)}
            />
          )}
        </div>
      </div>
    )
  }
})
