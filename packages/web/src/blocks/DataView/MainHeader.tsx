import {
  HotOutlined,
  PairOutlined,
  NewOutlined,
  ChartOutlined,
  VictorOutlined,
  RankOutlined,
  ShareOutlined
} from '@WEDex/icons'
import { defineComponent, ref, inject, onMounted } from 'vue'
import DexSelector from './components/DexSelector'
import HeaderGainerFilter from './components/HeaderGainerFilter'
import HeaderRankFilter from './components/HeaderRankFilter'
import HeaderTagFilter from './components/HeaderTagFilter'
import HeaderTopFilter from './components/HeaderTopFilter'
import NetworkSelector from './components/NetworkSelector'
import TrendTypeSelector from './components/TrendTypeSelector'

import style from './style.module.css'
import { DataListParamsKey } from './index'
import { MultiSelectorOptionType } from '@/components/MultiSelector'
import { allNetworks } from '@/constants'

export default defineComponent({
  name: 'MainHeader',
  setup(props, ctx) {
    const DataListParams = inject(DataListParamsKey)
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
      DataListParams
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
        <div class={style.mainNav}>
          <ul class="border-color-border border-b-1 whitespace-nowrap">
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
