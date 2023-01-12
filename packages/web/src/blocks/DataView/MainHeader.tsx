import {
  HotOutlined,
  PairOutlined,
  NewOutlined,
  ChartOutlined,
  VictorOutlined,
  RankOutlined,
  ShareOutlined,
  ExpandRightOutlined
} from '@wedex/icons'
import { defineComponent, ref, inject, Ref } from 'vue'
import HeaderGainerFilter from './components/HeaderGainerFilter'
import HeaderRankFilter from './components/HeaderRankFilter'
import HeaderTagFilter from './components/HeaderTagFilter'
import HeaderTopFilter from './components/HeaderTopFilter'
import TrendTypeSelector from './components/TrendTypeSelector'
import { getTrendTypeUpdate } from '@/blocks/DataView/components/TrendTypeSelector'
import { NetworkSelector, DexSelector, DexBlockSelector } from '@/components/MultiSelector'
import { DataListParamsKey, DataListParamsType } from '@/pages/index'
import { timeRangeToSocketMap } from '@/utils/trading'

export const setChannelFilter = (channelType: number, timeInterval: string) => {
  // set channel filter
  let updateParams: DataListParamsType = {
    rankBy: '',
    rankType: 0
  }

  switch (channelType) {
    case 1:
      // Hot pairs
      updateParams.rankBy = `pairReportIM.${timeRangeToSocketMap(timeInterval)}.views`
      updateParams.rankType = -1
      break
    case 2:
      // All pairs
      updateParams.rankBy = `lastTxAt`
      updateParams.rankType = -1
      break
    case 3:
      // New pairs
      updateParams.rankBy = `createdAt`
      updateParams.rankType = -1
      break
    case 4:
      // Trends
      // newRankBy = `pairReportIM.${timeRangeToSocketMap(timeInterval)}.priceChangeAbs`
      // newRankType = -1
      updateParams = getTrendTypeUpdate(1)
      break
    case 5:
      // Gainers & Losers
      updateParams.rankBy = `pairReportIM.${timeRangeToSocketMap(timeInterval)}.priceChange`
      updateParams.rankType = -1
      break
    case 6:
      // Ranking
      updateParams.rankBy = `pairReportIM.${timeRangeToSocketMap(timeInterval)}.volume.total`
      updateParams.rankType = -1
      break
    default:
  }

  return updateParams
}

export default defineComponent({
  name: 'MainHeader',
  setup(props, ctx) {
    const DataListParams = inject(DataListParamsKey)
    const currentExpand = inject<Ref<'left' | 'center' | 'right'>>('currentExpand')

    const navIconClass = 'h-4 mr-1 w-4 align-middle -mt-[3px]'

    const mainNavs = ref([
      {
        name: 'Hot pairs',
        value: 1,
        icon: <HotOutlined class={navIconClass} />
      },
      {
        name: 'All pairs',
        value: 2,
        icon: <PairOutlined class={navIconClass} />
      },
      {
        name: 'New pairs',
        value: 3,
        icon: <NewOutlined class={navIconClass} />
      },
      {
        name: 'Trends',
        value: 4,
        icon: <ChartOutlined class={navIconClass} />
      },
      {
        name: 'Gainers & Losers',
        value: 5,
        icon: <VictorOutlined class={navIconClass} />
      },
      {
        name: 'Ranking',
        value: 6,
        icon: <RankOutlined class={navIconClass} />
      },
      {
        name: 'Launch',
        value: null,
        link: 'https://weconomy.space',
        icon: <ShareOutlined class={navIconClass} />
      }
    ])

    return {
      mainNavs,
      DataListParams,
      currentExpand
    }
  },
  render() {
    const handleMainNavClick = (item: any) => {
      if (item.link) {
        window.open(item.link)
      } else if (this.DataListParams && this.DataListParams.timeInterval) {
        const updateParams = {
          or: undefined,
          sortType: undefined,
          sortBy: undefined,
          channelType: item.value,
          ...setChannelFilter(item.value, this.DataListParams.timeInterval)
        }
        console.log(item.value, updateParams)
        Object.assign(this.DataListParams, updateParams)
      }
    }

    return (
      <>
        {/* expand btn */}
        {this.currentExpand !== 'left' && (
          <ExpandRightOutlined
            class="cursor-pointer h-5 p-0.5 top-0 right-0 w-5 absolute hover:text-primary"
            onClick={() => (this.currentExpand = 'left')}
          />
        )}
        {/* mainNav */}
        <div class={`border-color-border border-b-1 px-2 select-none h-16`}>
          <ul class="h-full pt-4.5 whitespace-nowrap overflow-x-scroll overflow-y-hidden ">
            {this.mainNavs.map(item => (
              <li
                class={`rounded-sm cursor-pointer h-7 mr-4 px-2 leading-7 relative inline-block hover:text-primary ${
                  this.DataListParams?.channelType === item.value
                    ? 'bg-primary-bg text-primary'
                    : ''
                }`}
                onClick={() => handleMainNavClick(item)}
              >
                {item.icon}
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        {/* subNav */}
        <div class={`flex h-10 text-xs px-3 text-color3 items-center`}>
          {this.DataListParams && this.DataListParams.channelType === 4 && (
            <TrendTypeSelector class="mr-4" />
          )}
          {this.DataListParams && this.DataListParams.channelType === 5 && (
            <HeaderGainerFilter class="mr-4" />
          )}
          {/* Networks selector */}
          <NetworkSelector
            class="mr-4"
            value={this.DataListParams?.chainIds}
            onChange={value => this.DataListParams && (this.DataListParams.chainIds = value)}
          />
          {/* DEXes selector */}
          {this.DataListParams?.channelType !== 6 && (
            <DexSelector
              class="mr-4"
              value={this.DataListParams?.dexs}
              onChange={value => this.DataListParams && (this.DataListParams.dexs = value)}
            />
          )}

          {this.DataListParams && this.DataListParams.channelType === 1 && (
            <HeaderTopFilter class="mr-4" />
          )}

          {this.DataListParams?.channelType !== 6 && (
            <HeaderTagFilter class="mr-4 overflow-x-auto" />
          )}

          {this.DataListParams && this.DataListParams.channelType === 6 && (
            <div class="flex items-center">
              <span class="text-color3">Rank By:</span>
              <HeaderRankFilter class="mr-4" />
            </div>
          )}
        </div>
        {/* rank dex */}
        {this.DataListParams && this.DataListParams.channelType === 6 && (
          <div class={`flex text-xs px-5 text-color3 items-center h-auto mb-2`}>
            <DexBlockSelector
              class="mr-4"
              value={this.DataListParams?.dexs}
              onChange={value => this.DataListParams && (this.DataListParams.dexs = value)}
            />
          </div>
        )}
      </>
    )
  }
})
