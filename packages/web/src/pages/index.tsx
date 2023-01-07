import { defineComponent, ref, watch, provide, InjectionKey } from 'vue'
import DataDetail from '@/blocks/DataDetail'
import DataView from '@/blocks/DataView'
import ExtentionBar from '@/blocks/ExtentionBar'
import { TradingDataItem } from '@/components/TradingDataList'

export type DataListParamsType = {
  page?: number
  size?: number
  chainIds?: number[]
  dexs?: string[]
  categoires?: string[]
  keyword?: string
  liquidityMax?: number
  liquidityMin?: number
  pairAgeMax?: number
  pairAgeMin?: number
  rankBy?: string
  rankType?: number
  timeInterval?: string
  trendMax?: number
  trendMin?: number
  txnsMax?: number
  txnsMin?: number
  txnsBuysMax?: number
  txnsBuysMin?: number
  txnsSellsMax?: number
  txnsSellsMin?: number
  volumeMax?: number
  volumeMin?: number
  // custom
  channelType?: number
  sortMethod?: string
  trendType?: number
  disablePaginate?: boolean
}
export const DataListParamsKey = Symbol() as InjectionKey<DataListParamsType>
export type DataListParamsKeys =
  | 'page'
  | 'size'
  | 'chainIds'
  | 'dexs'
  | 'categoires'
  | 'keyword'
  | 'liquidityMax'
  | 'liquidityMin'
  | 'pairAgeMax'
  | 'pairAgeMin'
  | 'rankBy'
  | 'rankType'
  | 'timeInterval'
  | 'trendMax'
  | 'trendMin'
  | 'txnsMax'
  | 'txnsMin'
  | 'txnsBuysMax'
  | 'txnsBuysMin'
  | 'txnsSellsMax'
  | 'txnsSellsMin'
  | 'volumeMax'
  | 'volumeMin'
  | 'channelType'
  | 'disablePaginate'

export const DefaultPageSize = 50

const LandingPage = defineComponent({
  name: 'LandingPage',
  setup(props, ctx) {
    const leftClass = ref(`panelExpand`)
    const centerClass = ref('w-0')
    const rightClass = ref(`rightPanelStatic`)
    const currentPair = ref<TradingDataItem | undefined>()
    const currentExpand = ref<'left' | 'center' | 'right'>('left')

    watch(
      () => currentExpand.value,
      current => {
        switch (current) {
          case 'left':
            leftClass.value = 'panelExpand'
            setTimeout(() => {
              centerClass.value = 'w-0'
              currentPair.value = undefined
            }, 0)
            rightClass.value = 'rightPanelStatic'
            break
          case 'center':
            leftClass.value = 'leftPanelStatic'
            setTimeout(() => {
              centerClass.value = 'flex-1'
            }, 0)
            rightClass.value = 'rightPanelStatic'
            break
          case 'right':
            leftClass.value = 'leftPanelStatic'
            setTimeout(() => {
              centerClass.value = 'w-0'
              currentPair.value = undefined
            }, 0)
            rightClass.value = 'panelExpand'
            break
          default:
            console.warn('currentExpand error', current)
        }
      },
      {
        immediate: true
      }
    )
    // Pairslist filter
    const DataListParams = ref<DataListParamsType>({
      chainIds: [],
      dexs: [],
      page: 1,
      size: DefaultPageSize,
      timeInterval: '24h',
      categoires: [],
      channelType: 2,
      rankType: -1,
      rankBy: 'lastTxAt',
      disablePaginate: false,
      trendType: 0
    })

    provide(DataListParamsKey, DataListParams.value)
    provide('currentPair', currentPair)
    provide('currentExpand', currentExpand)

    return {
      leftClass,
      centerClass,
      rightClass,
      currentExpand
    }
  },
  render() {
    const pannelClass = 'transition-all overflow-hidden relative'

    return (
      <div class="relative" style={{ paddingRight: '324px' }}>
        <div class="flex h-full">
          <DataView class={`${pannelClass} ${this.leftClass}`} />
          <DataDetail class={`${pannelClass} ${this.centerClass}`} />
        </div>
        <ExtentionBar
          class={`!absolute right-0 top-0 bottom-0 ${pannelClass} ${this.rightClass}`}
        />
      </div>
    )
  }
})

export default LandingPage
