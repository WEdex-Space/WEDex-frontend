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
import { defineComponent, ref, inject, onMounted, Ref } from 'vue'
import HeaderGainerFilter from './components/HeaderGainerFilter'
import HeaderRankFilter from './components/HeaderRankFilter'
import HeaderTagFilter from './components/HeaderTagFilter'
import HeaderTopFilter from './components/HeaderTopFilter'
import TrendTypeSelector from './components/TrendTypeSelector'

import style from './style.module.css'
import { MultiSelectorOptionType, NetworkSelector, DexSelector } from '@/components/MultiSelector'
import { allNetworks } from '@/constants'
import { DataListParamsKey } from '@/pages/index'

export default defineComponent({
  name: 'MainHeader',
  setup(props, ctx) {
    const DataListParams = inject(DataListParamsKey)
    const currentExpand = inject<Ref<'left' | 'center' | 'right'>>('currentExpand')
    const networksOptions = ref<MultiSelectorOptionType[]>([])
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

    const DEXesData = ref([
      {
        id: 1,
        name: 'DEXes1'
      },
      {
        id: 2,
        name: 'DEXes2'
      },
      {
        id: 3,
        name: 'DEXes3'
      },
      {
        id: 4,
        name: 'DEXes4'
      },
      {
        id: 5,
        name: 'DEXes5'
      }
    ])

    onMounted(() => {
      // get networks
      networksOptions.value = [
        {
          label: 'All Networks',
          value: null
        },
        ...allNetworks
          .filter(item => !!item.shortName)
          .map(item => {
            return {
              label: item.shortName as string,
              value: item.chainId,
              icon: item.logo
            }
          })
      ]
    })

    return {
      networksOptions,
      mainNavs,
      DEXesData,
      DataListParams,
      currentExpand
    }
  },
  render() {
    const handleMainNavClick = (item: any) => {
      if (item.link) {
        window.open(item.link)
      } else if (this.DataListParams) {
        this.DataListParams.type = item.value
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
        <div class={`${style.mainNav} h-14`}>
          <ul class="h-full py-3 whitespace-nowrap overflow-x-scroll overflow-y-hidden ">
            {this.mainNavs.map(item => (
              <li
                class={`${this.DataListParams?.type === item.value ? style.mainNavItemCur : ''}`}
                onClick={() => handleMainNavClick(item)}
              >
                {item.icon}
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div class={style.subNav}>
          {this.DataListParams && this.DataListParams.type === 4 && (
            <TrendTypeSelector class="mr-4" />
          )}
          {this.DataListParams && this.DataListParams.type === 5 && (
            <HeaderGainerFilter class="mr-4" />
          )}
          {/* Networks selector */}
          <NetworkSelector
            class="mr-4"
            value={this.DataListParams?.chainId}
            options={this.networksOptions}
            onChange={value => this.DataListParams && (this.DataListParams.chainId = value)}
          />
          {/* DEXes selector */}
          <DexSelector
            class="mr-4"
            value={this.DataListParams?.DEXe}
            options={this.networksOptions}
            onChange={value => this.DataListParams && (this.DataListParams.DEXe = value)}
          />

          {this.DataListParams && this.DataListParams.type === 1 && (
            <HeaderTopFilter class="mr-4" />
          )}

          <HeaderTagFilter class="mr-4 __list" />

          {this.DataListParams && this.DataListParams.type === 6 && (
            <div class="flex items-center">
              <span class="text-color3">Rank By:</span>
              <HeaderRankFilter class="mr-4" />
            </div>
          )}
        </div>
      </>
    )
  }
})
