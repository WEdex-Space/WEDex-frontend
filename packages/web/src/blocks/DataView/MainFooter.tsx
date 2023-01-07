import { USelect } from '@wedex/components'
import { CustomOutlined, ExportOutlined } from '@wedex/icons'
import { defineComponent, ref, inject, Ref, watch, onBeforeUnmount } from 'vue'
import CustomizeFilter from './components/CustomizeFilter'
import { setChannelFilter } from '@/blocks/DataView/MainHeader'
import { DataListParamsKey } from '@/pages/index'
import { useSocketStore } from '@/stores'
import { timeRangeToSocketMap } from '@/utils/trading'

const footerCellClass =
  'border-l-1 border-color-border 2xl:px-7 px-3 leading-10 cursor-pointer hover:text-color2 select-none'
const footerCellIconClass = 'w-3 h-3 align-middle mx-1 -mt-[2px]'
const footerListCellClass = '2xl:px-7 px-3 border-r-1 border-color-border cursor-default'

export default defineComponent({
  name: 'MainFooter',
  setup() {
    const SocketStore = useSocketStore()
    const currentExpand = inject<Ref<'left' | 'center' | 'right'>>('currentExpand')
    const DataListParams = inject(DataListParamsKey)

    const formData = ref({
      range: DataListParams?.timeInterval || '24h'
    })

    watch(
      () => formData.value,
      () => {
        if (DataListParams) {
          DataListParams.timeInterval = formData.value.range
        }
      },
      {
        deep: true
      }
    )

    const rangeData = ref([
      {
        label: 'Last 5 mins',
        value: '5m'
      },
      {
        label: 'Last 1 hour',
        value: '1h'
      },
      {
        label: 'Last 4 hours',
        value: '4h'
      },
      {
        label: 'Last 6 hours',
        value: '6h'
      },
      {
        label: 'Last 24 hours',
        value: '24h'
      }
    ])

    const stats = ref<any>(null)
    // socket subscribe list-stats
    SocketStore.init().then(socket => {
      SocketStore.subscribe('list-stats', undefined, msg => {
        console.log('subscribe list-stats', msg)
        stats.value = msg.data.value
      })
    })

    onBeforeUnmount(() => {
      SocketStore.unsubscribe('list-stats')
    })

    return {
      DataListParams,
      currentExpand,
      formData,
      rangeData,
      stats
    }
  },
  render() {
    const updateTimeRealy = () => {
      if (this.DataListParams?.channelType && this.DataListParams?.timeInterval) {
        Object.assign(
          this.DataListParams,
          setChannelFilter(this.DataListParams.channelType, this.DataListParams.timeInterval)
        )
      }
    }

    return this.currentExpand === 'left' && this.DataListParams ? (
      <div class="border-color-border flex border-t-1 h-10 text-xs text-color3 ">
        <ul class="flex flex-1 items-center">
          {[2, 3, 6].indexOf(this.DataListParams?.channelType || 0) !== -1 && (
            <>
              <li class={footerListCellClass}>
                Tokens: <span class="text-color1">{this.stats?.tokens || '--'}</span>
              </li>
              <li class={footerListCellClass}>
                Networks: <span class="text-color1">{this.stats?.networks || '--'}</span>
              </li>
              <li class={footerListCellClass}>
                DEXes: <span class="text-color1">{this.stats?.dexs || '--'}</span>
              </li>
              <li class={footerListCellClass}>
                Pools: <span class="text-color1">{this.stats?.pools || '--'}</span>
              </li>
            </>
          )}
          <li class={footerListCellClass}>
            {this.DataListParams.timeInterval} Txns:
            <span class="px-1 text-color1">
              {this.stats
                ? this.stats[
                    timeRangeToSocketMap(this.DataListParams.timeInterval as string) as string
                  ]?.txns
                : '--'}
            </span>
          </li>
          <li class={footerListCellClass}>
            {this.DataListParams.timeInterval} Volume:
            <span class="px-1 text-color1">
              {this.stats
                ? this.stats[
                    timeRangeToSocketMap(this.DataListParams.timeInterval as string) as string
                  ]?.volume
                : '--'}
            </span>
          </li>
        </ul>
        <div class={`border-l-1 border-color-border w-40 flex items-center`}>
          <USelect
            class={`selectTransparent`}
            size="small"
            value={this.DataListParams.timeInterval}
            options={this.rangeData}
            onUpdate:value={value => {
              this.DataListParams && (this.DataListParams.timeInterval = value)
              updateTimeRealy()
            }}
          ></USelect>
        </div>
        <CustomizeFilter
          v-slots={{
            default: (isVisible: boolean) => (
              <div class={footerCellClass}>
                <CustomOutlined
                  class={`${footerCellIconClass} ${isVisible ? 'text-primary' : ''}`}
                />
                Customize
              </div>
            )
          }}
        />

        <div class={footerCellClass}>
          <ExportOutlined class={footerCellIconClass} />
          Export
        </div>
      </div>
    ) : null
  }
})
