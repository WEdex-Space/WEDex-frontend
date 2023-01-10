import { useTimeAgo } from '@vueuse/core'
import { UInput } from '@wedex/components'
import {
  PlusOutlined,
  CloseOutlined,
  DragOutlined,
  DeleteOutlined,
  EditOutlined
} from '@wedex/icons'
import { pluralize } from 'inflected'
import { defineComponent, ref, PropType } from 'vue'
import Draggable from 'vuedraggable'
import { watchListItem } from '@/blocks/WatchList/index'

export default defineComponent({
  name: 'ListEdit',
  props: {
    list: {
      type: Array as PropType<watchListItem[]>,
      default: () => []
    }
  },
  emits: ['create', 'edit', 'delete', 'sort', 'cancel'],
  setup(props, ctx) {
    // create list
    const createList = ref<watchListItem[]>([])

    const editIndex = ref<number | null>(null)

    const handleRemove = (item: watchListItem) => {
      console.log('handleRemove', item)
      ctx.emit('delete', item)
    }

    const handleSave = (item: watchListItem) => {
      console.log('handleSave', item)
      if (!item.id) {
        // create
        ctx.emit('create', item)
        createList.value.splice(0, 1)
      } else {
        // edit
        ctx.emit('edit', item)
        editIndex.value = null
      }
    }

    const handleCancelEdit = (item: watchListItem) => {
      console.log('handleCancelEdit')
      createList.value.splice(0, 1)
      editIndex.value = null
    }

    return {
      editIndex,
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
          list={this.list}
          itemKey="value"
          tag="ul"
          class="text-xs"
          handle=".my-handle"
          onSort={() => this.$emit('sort', this.list)}
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
                      value={element.title}
                      autofocus
                      on-update:value={(value: string) => (element.title = value)}
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
                      <div class="font-700 text-color1">{element.title}</div>
                      <div class="text-color3">
                        {element.list?.length} {element.list?.length ? pluralize('pair') : 'pair'},
                        updated {useTimeAgo(element.updateTime).value}
                      </div>
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
                  value={item.title}
                  autofocus
                  on-update:value={(value: string) => (item.title = value)}
                  onKeyup={(e: any) =>
                    e.key === 'Enter'
                      ? this.handleSave(item)
                      : e.key === 'Escape'
                      ? this.handleCancelEdit(item)
                      : null
                  }
                  onBlur={() => !item.title && this.handleCancelEdit(item)}
                />
              </div>
            </li>
          ))}
        </ul>

        <div class="cursor-pointer flex text-primary text-xs p-3 select-none items-center hover:opacity-80">
          <div class="flex-1"></div>
          <div
            class={`flex items-center ${this.createList.length ? 'cursor-not-allowed' : ''}`}
            onClick={() =>
              !this.createList.length &&
              this.createList.push({ title: '', index: this.list.length })
            }
          >
            <PlusOutlined class="h-3 mr-1 w-3" />
            Add new list
          </div>
        </div>
      </>
    )
  }
})
