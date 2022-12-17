import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainFooter',
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
    return <div class="border-color-border border-t-1 h-10">foot filter</div>
  }
})
