import { USelect } from '@wedex/components'
import { ShareOutlined } from '@wedex/icons'
import { defineComponent, ref } from 'vue'
import style from './style.module.css'
import { allNetworks } from '@/constants'

export default defineComponent({
  name: 'MainHeader',
  setup() {
    const typeData = ref([
      {
        name: 'Hot pairs',
        value: 1
      },
      {
        name: 'All pairs',
        value: 2
      },
      {
        name: 'New pairs',
        value: 3
      },
      {
        name: 'Trends',
        value: 4
      },
      {
        name: 'Gainers & Losers',
        value: 5
      },
      {
        name: 'Ranking',
        value: 6
      },
      {
        name: 'Launch',
        value: null,
        link: 'https://weconomy.space'
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

    const tagData = ref([
      {
        name: 'All',
        value: null
      },
      {
        name: 'Defi',
        value: 'Defi'
      },
      {
        name: 'DEX',
        value: 'DEX'
      },
      {
        name: 'NFT',
        value: 'NFT'
      },
      {
        name: 'Gaming',
        value: 'Gaming'
      },
      {
        name: 'Layer-1',
        value: 'Layer-1'
      },
      {
        name: 'Metaverse',
        value: 'Metaverse'
      }
    ])

    const formData = ref<{
      chainId: number | null
      type: number | null
      DEXe: number | null
      tag: string | null
    }>({
      chainId: null,
      type: 2,
      DEXe: null,
      tag: null
    })

    return {
      typeData,
      DEXesData,
      tagData,
      formData
    }
  },
  render() {
    return (
      <>
        <div class={style.mainNav}>
          <ul class="border-color-border border-b-1 whitespace-nowrap">
            {this.typeData.map(item => (
              <li
                class={`${this.formData.type === item.value ? style.mainNavItemCur : ''}`}
                onClick={() => (this.formData.type = item.value)}
              >
                {item.name}
                {item.link && <ShareOutlined class="h-3 ml-1 text-color3 w-3" />}
              </li>
            ))}
          </ul>
        </div>
        <div class={style.subNav}>
          <USelect
            class={`mr-4 w-40 selectTransparent`}
            placeholder="Networks"
            clearable
            v-model:value={this.formData.chainId}
            options={allNetworks.map(item => {
              return {
                label: item.shortName,
                value: item.chainId
              }
            })}
            onUpdate:value={value => (this.formData.chainId = value)}
          ></USelect>
          <USelect
            class={`mr-4 w-40 selectTransparent`}
            placeholder="DEXes"
            clearable
            v-model:value={this.formData.DEXe}
            options={this.DEXesData.map(item => {
              return {
                label: item.name,
                value: item.id
              }
            })}
            onUpdate:value={value => (this.formData.DEXe = value)}
          ></USelect>
          <ul class="flex flex-1  __list items-center">
            {this.tagData.map(item => (
              <li
                class={[
                  style.subNavItem,
                  `${this.formData.tag === item.value ? style.subNavItemCur : ''}`
                ]}
                onClick={() => (this.formData.tag = item.value)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
})
