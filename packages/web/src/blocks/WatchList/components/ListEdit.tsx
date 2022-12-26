import { UInput } from '@wedex/components'
import {
  PlusOutlined,
  CloseOutlined,
  DragOutlined,
  DeleteOutlined,
  EditOutlined
} from '@wedex/icons'
import { defineComponent, ref, PropType } from 'vue'
import Draggable from 'vuedraggable'
import { watchListType } from '@/blocks/WatchList/index'

export default defineComponent({
  name: 'ListEdit',
  props: {
    list: {
      type: Array as PropType<watchListType[]>,
      default() {
        return [
          {
            name: 'Mainlist',
            value: ''
          }
        ]
      }
    }
  },
  emits: ['change', 'cancel'],
  setup(props, ctx) {
    const editList = ref<watchListType[]>([...props.list])

    const editIndex = ref<number | null>(null)

    const handleEdit = (item: watchListType) => {
      console.log('handleEdit', item)
    }

    const handleRemove = (item: watchListType) => {
      console.log('handleRemove', item)
    }

    const handleSave = (item: watchListType) => {
      console.log('handleSave', item)
      // TODO send put request
      if (!item.value) {
        // create
        createList.value.splice(0, 1)
      } else {
        // edit
        editIndex.value = null
      }
    }

    const handleCancelEdit = (item: watchListType) => {
      console.log('handleCancelEdit')
      if (!item.value) {
        // create
        createList.value.splice(0, 1)
      } else {
        // edit
        editIndex.value = null
      }
    }

    // create list
    const createList = ref<watchListType[]>([])

    return {
      editIndex,
      editList,
      handleEdit,
      handleRemove,
      handleSave,
      handleCancelEdit,
      createList
    }
  },
  render() {
    return (
      <>
        <div class="flex h-12 px-3 items-center">
          <div class="flex-1">Setting</div>
          <CloseOutlined
            class="cursor-pointer h-5 text-color3 w-5 hover:text-color1"
            onClick={() => this.$emit('cancel')}
          />
        </div>

        <Draggable
          list={this.editList}
          itemKey="value"
          tag="ul"
          class="text-xs"
          handle=".my-handle"
          v-slots={{
            item: ({ element, index }: { element: any; index: number }) => (
              <li class={`h-12 border-b-1 border-color-border flex items-center`}>
                <span class="cursor-move my-handle px-2 text-color3 leading-0 hover:text-color1">
                  <DragOutlined class="h-3 " />
                </span>
                {this.editIndex === index ? (
                  <div class="w-[80%]">
                    <UInput
                      placeholder="List name"
                      size="tiny"
                      value={element.name}
                      autofocus
                      on-update:value={(value: string) => (element.name = value)}
                      onKeyup={(e: any) =>
                        e.key === 'Enter'
                          ? this.handleSave(element)
                          : e.key === 'Escape'
                          ? this.handleCancelEdit(element)
                          : null
                      }
                    />
                  </div>
                ) : (
                  <>
                    <div class="flex-1 overflow-hidden">
                      <div class="font-700 text-color1">{element.name}</div>
                      <div class="text-color3">{index} pair, updated 25 minutes ago</div>
                    </div>
                    <span
                      class="cursor-pointer px-2 text-color3 leading-0 hover:text-color2"
                      onClick={() => (this.editIndex = index)}
                    >
                      <EditOutlined class="h-3 " />
                    </span>
                    {index !== 0 && (
                      <span
                        class="cursor-pointer px-2 text-color3 leading-0 hover:text-color2"
                        onClick={() => this.handleRemove(element)}
                      >
                        <DeleteOutlined class="h-3 " />
                      </span>
                    )}
                  </>
                )}
              </li>
            )
          }}
        />
        {/* createList */}
        <ul class="text-xs">
          {this.createList.map(item => (
            <li class={`h-12 border-b-1 border-color-border flex items-center`}>
              <span class="cursor-not-allowed my-handle px-2 text-color3 leading-0 hover:text-color1">
                <DragOutlined class="h-3 " />
              </span>
              <div class="w-[80%]">
                <UInput
                  placeholder="List name"
                  size="tiny"
                  value={item.name}
                  autofocus
                  on-update:value={(value: string) => (item.name = value)}
                  onKeyup={(e: any) =>
                    e.key === 'Enter'
                      ? this.handleSave(item)
                      : e.key === 'Escape'
                      ? this.handleCancelEdit(item)
                      : null
                  }
                />
              </div>
            </li>
          ))}
        </ul>

        <div class="cursor-pointer flex text-primary text-xs p-3 items-center hover:opacity-80">
          <div class="flex-1"></div>
          <div
            class={`flex items-center ${this.createList.length ? 'cursor-not-allowed' : ''}`}
            onClick={() => !this.createList.length && this.createList.push({ name: '', value: '' })}
          >
            <PlusOutlined class="h-3 mr-1 w-3" />
            Add new list
          </div>
        </div>
      </>
    )
  }
})
