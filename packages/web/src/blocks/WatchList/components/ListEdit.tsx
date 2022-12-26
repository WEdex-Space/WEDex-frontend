import {
  PlusOutlined,
  CloseOutlined,
  DragOutlined,
  DeleteOutlined,
  EditOutlined
} from '@wedex/icons'
import { defineComponent, ref, PropType } from 'vue'
import Draggable from 'vuedraggable'

export default defineComponent({
  name: 'ListEdit',
  props: {
    list: {
      type: Array as PropType<any[]>,
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
    const editList = ref(props.list)

    const handleEdit = (item: any) => {
      console.log('handleEdit', item)
    }

    const handleRemove = (item: any) => {
      console.log('handleRemove', item)
    }

    return {
      editList,
      handleEdit,
      handleRemove
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
                <div class="flex-1 overflow-hidden">
                  <div class="font-700 text-color1">{element.name}</div>
                  <div class="text-color3">{index} pair, updated 25 minutes ago</div>
                </div>
                <span
                  class="cursor-pointer px-2 text-color3 leading-0 hover:text-color2"
                  onClick={() => this.handleEdit(element)}
                >
                  <EditOutlined class="h-3 " />
                </span>
                <span
                  class="cursor-pointer px-2 text-color3 leading-0 hover:text-color2"
                  onClick={() => this.handleRemove(element)}
                >
                  <DeleteOutlined class="h-3 " />
                </span>
              </li>
            )
          }}
        />

        {/* <ul class="text-xs">
          {this.list.map(item => (
            <li
              class={`h-12 border-b-1 border-color-border flex items-center`}
              onClick={() => this.handleClick(item.value)}
            >
              <span class="cursor-move pr-2 pl-1 text-color3 leading-0 hover:text-color1">
                <DragOutlined class="h-3 " />
              </span>
              <div class="flex-1">
                <div class="font-700 text-color1">{item.name}</div>
                <div class="text-color3">1 pair, updated 25 minutes ago</div>
              </div>
              <span class="cursor-pointer px-2 text-color3 leading-0 hover:text-color2">
                <EditOutlined class="h-3 " />
              </span>
              <span class="cursor-pointer px-2 text-color3 leading-0 hover:text-color2">
                <DeleteOutlined class="h-3 " />
              </span>
            </li>
          ))}
        </ul> */}

        <div class="cursor-pointer flex text-primary text-xs p-3 items-center hover:opacity-80">
          <div class="flex-1"></div>
          <PlusOutlined class="h-3 mr-1 w-3" />
          Add new list
        </div>
      </>
    )
  }
})
