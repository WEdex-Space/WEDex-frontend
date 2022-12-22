import { UPopover } from '@wedex/components'
import { StarOutlined, StarFilled } from '@wedex/icons'
import { defineComponent, ref, inject, Ref } from 'vue'
import DynamicNumber from '@/components/DynamicNumber'

export default defineComponent({
  name: 'DetailHeader',
  setup() {
    const currentExpand = inject<Ref<'left' | 'center' | 'right'>>('currentExpand')
    const tipRef = ref()
    const watchLists = ref([
      {
        name: 'MainList'
      },
      {
        name: 'List2'
      }
    ])

    const closeWatchModal = () => {
      tipRef.value && tipRef.value.setShow?.(false)
    }

    const headerCellData = ref([
      {
        label: '433 ftm',
        value: <span class="text-color1">$0.002797</span>
      },
      {
        label: '5m',
        value: <DynamicNumber value={'10%'} symbol={Math.floor(Math.random() * 10) % 2 ? 1 : -1} />
      },
      {
        label: '1h',
        value: <DynamicNumber value={'10%'} symbol={Math.floor(Math.random() * 10) % 2 ? 1 : -1} />
      },
      {
        label: '6h',
        value: <DynamicNumber value={'10%'} symbol={Math.floor(Math.random() * 10) % 2 ? 1 : -1} />
      },
      {
        label: '24h',
        value: <DynamicNumber value={'10%'} symbol={Math.floor(Math.random() * 10) % 2 ? 1 : -1} />
      },
      {
        label: '24h High',
        value: <span class="text-color1">$0.002797</span>
      },
      {
        label: '24h Low',
        value: <span class="text-color1">$0.002797</span>
      },
      {
        label: 'Liquidity',
        value: <span class="text-color1">$233k</span>
      },
      {
        label: 'FDV',
        value: <span class="text-color1">$233k</span>
      }
    ])

    return {
      currentExpand,
      tipRef,
      watchLists,
      closeWatchModal,
      headerCellData
    }
  },
  render() {
    return (
      <div class="border-color-border flex border-b-1 h-13.25 px-2.5 items-center">
        <div>
          <div class="font-700 text-base text-color1">Token1/Token2</div>
          <div class="text-color3">Token name</div>
        </div>
        <div class="flex h-full flex-1 mx-6 text-right text-xs overflow-x-scroll items-center">
          {this.headerCellData.map(item => (
            <div class="px-3">
              <div class="text-color3">{item.label}</div>
              {item.value}
            </div>
          ))}
        </div>
        <UPopover
          ref={ref => (this.tipRef = ref)}
          trigger="click"
          placement="bottom"
          raw={true}
          arrowStyle={{ background: '#2C3138' }}
          v-slots={{
            trigger: () => (
              <StarOutlined class="cursor-pointer h-6 text-color3 w-6 hover:text-primary" />
            ),
            default: () => (
              <div class="border border-color-border rounded bg-bg2 text-xs p-2 text-color3 w-40">
                <ul>
                  {this.watchLists.map((item, index) => (
                    <li
                      class={`h-8 flex items-center cursor-pointer hover:text-primary ${
                        index % 2 === 0 ? 'text-primary font-700' : ''
                      }`}
                      onClick={this.closeWatchModal}
                    >
                      {index % 2 === 0 ? (
                        <StarFilled class="h-4 mr-1 w-4" />
                      ) : (
                        <StarOutlined class="h-4 mr-1 w-4" />
                      )}
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            )
          }}
        />
      </div>
    )
  }
})
