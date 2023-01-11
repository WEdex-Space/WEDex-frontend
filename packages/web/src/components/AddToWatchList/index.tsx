import { UPopover } from '@wedex/components'
import { StarOutlined, StarFilled } from '@wedex/icons'
import { defineComponent, ref } from 'vue'
import { WatchListFunctionKey } from '@/blocks/WatchList/index'
import { useCustomDataSync } from '@/hooks'

export default defineComponent({
  name: 'AddToWatchList',
  props: {
    pairId: {
      type: String,
      required: true
    },
    starClass: {
      type: String,
      default: `h-6 w-6`
    }
  },
  setup(props) {
    const tipRef = ref()
    const watchListStore = useCustomDataSync(WatchListFunctionKey)

    const addToWatchList = (item: any, isInList?: boolean) => {
      if (isInList) {
        item.list = (item.list || []).filter((e: any) => e.pairId !== props.pairId)
      } else {
        item.list = (item.list || []).concat({
          pairId: props.pairId
        })
      }

      watchListStore.update(item)

      tipRef.value && tipRef.value.setShow?.(false)
    }

    return {
      tipRef,
      watchListStore,
      addToWatchList
    }
  },
  render() {
    return (
      <UPopover
        ref={ref => (this.tipRef = ref)}
        trigger="click"
        placement="bottom"
        raw={true}
        arrowStyle={{ background: '#2C3138' }}
        v-slots={{
          trigger: () => {
            const isInWatch = this.watchListStore.findListByPiarid(this.pairId)?.length
            return isInWatch ? (
              <StarFilled
                class={`cursor-pointer text-primary text-color3 hover:text-primary ${this.starClass}`}
              />
            ) : (
              <StarOutlined
                class={`cursor-pointer text-color3 hover:text-primary ${this.starClass}`}
              />
            )
          },
          default: () => (
            <div class="border border-color-border rounded bg-bg2 text-xs p-2 text-color3 w-40">
              <ul>
                {(this.watchListStore.list.value || []).map((item: any, index: number) => {
                  const isInList = this.watchListStore
                    .findListByPiarid(this.pairId)
                    ?.find((e: any) => e.id === item.id)
                  return (
                    <li
                      class={`h-8 flex items-center cursor-pointer hover:text-primary ${
                        isInList ? 'text-primary font-700' : ''
                      }`}
                      onClick={() => this.addToWatchList(item, isInList)}
                    >
                      {isInList ? (
                        <StarFilled class="h-4 mr-1 w-4" />
                      ) : (
                        <StarOutlined class="h-4 mr-1 w-4" />
                      )}
                      {item.title}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        }}
      />
    )
  }
})
