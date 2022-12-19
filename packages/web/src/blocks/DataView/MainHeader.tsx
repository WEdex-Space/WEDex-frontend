import { USelect } from '@wedex/components'
import {
  HotOutlined,
  PairOutlined,
  NewOutlined,
  ChartOutlined,
  VictorOutlined,
  RankOutlined,
  ShareOutlined
} from '@wedex/icons'
import { defineComponent, ref, inject } from 'vue'
import HeaderTagFilter from './components/HeaderTagFilter'
import HeaderTopFilter from './components/HeaderTopFilter'
import TrendTypeSelector from './components/TrendTypeSelector'
import style from './style.module.css'
import { DataListParamsKey } from './index'
import { allNetworks } from '@/constants'

export default defineComponent({
  name: 'MainHeader',
  setup(props, ctx) {
    const DataListParams = inject(DataListParamsKey)

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

    return {
      mainNavs,
      DEXesData,
      DataListParams
    }
  },
  render() {
    if (!this.DataListParams) {
      return null
    }

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
          <USelect
            class={`mr-4 w-40 selectTransparent`}
            size="small"
            placeholder="Networks"
            clearable
            value={this.DataListParams?.chainId}
            options={allNetworks.map(item => {
              return {
                label: item.shortName,
                value: item.chainId
              }
            })}
            onUpdate:value={value => this.DataListParams && (this.DataListParams.chainId = value)}
          ></USelect>
          <USelect
            class={`mr-4 w-40 selectTransparent`}
            size="small"
            placeholder="DEXes"
            clearable
            value={this.DataListParams?.DEXe}
            options={this.DEXesData.map(item => {
              return {
                label: item.name,
                value: item.id
              }
            })}
            onUpdate:value={value => this.DataListParams && (this.DataListParams.DEXe = value)}
          ></USelect>
          {this.DataListParams && this.DataListParams.type === 1 && (
            <HeaderTopFilter class="mr-4" />
          )}
          <HeaderTagFilter class="flex-1  __list " />
        </div>
      </>
    )
  }
})
