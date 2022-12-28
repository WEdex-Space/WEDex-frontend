import { UTable } from '@wedex/components'
import { defineComponent, ref, onMounted } from 'vue'
import DynamicNumber from '@/components/DynamicNumber'
import { NetworkSelector, MultiSelectorOptionType } from '@/components/MultiSelector'
import { allNetworks } from '@/constants'
import { formatBigNumber } from '@/utils/numberFormat'

export type AssetsDataItem = {
  Token: string
  Price: number | string
  Quantity: number | string
}

export default defineComponent({
  name: 'Assets',
  setup() {
    const networksOptions = ref<MultiSelectorOptionType[]>([])
    const selectChain = ref([])

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

    const columns = ref([
      {
        title: 'Token',
        key: 'Token',
        render: (data: AssetsDataItem, index: number) => {
          return (
            <div class="flex items-center">
              <span class="rounded-full bg-bg3 h-4 mr-2 w-4"></span>
              <div>
                <strong class="text-color1">{data.Token}</strong>
                <div class="text-color3">Ethereum</div>
              </div>
            </div>
          )
        }
      },
      {
        title: 'Price',
        key: 'Price',
        align: 'right',
        render: (data: AssetsDataItem, index: number) => {
          return (
            <>
              <span class="text-color1">{`$${formatBigNumber(data.Price)}`}</span>
              <DynamicNumber class="font-semibold" value={'1.2%'} symbol={index % 2 ? 1 : -1} />
            </>
          )
        }
      },
      {
        title: 'Quantity',
        key: 'Quantity',
        align: 'right',
        render: (data: AssetsDataItem, index: number) => {
          return (
            <>
              <span class="text-color1">{`$${formatBigNumber(data.Quantity)}`}</span>
              <div class="text-color-up">1.2 ETH</div>
            </>
          )
        }
      }
    ])

    const dataList = ref([
      {
        Token: 'Eth',
        Price: Math.random() * 1e3,
        Quantity: Math.random() * Math.random() * 1e7
      }
    ])

    return {
      networksOptions,
      selectChain,
      columns,
      dataList
    }
  },
  render() {
    return (
      <>
        <div class="text-xs p-5">
          <div class="flex mb-2 items-center">
            <div class="flex-1">Net Worth</div>
            {/* Networks selector */}
            <NetworkSelector
              class="mr-4"
              value={this.selectChain}
              options={this.networksOptions}
              onChange={value => (this.selectChain = value)}
            />
          </div>
          <div class=" text-color1">
            <strong class="text-xl">$68.12</strong>
            <span class="mx-1 text-color-up">+$23.93</span>
            24h
          </div>
        </div>
        {/* list */}
        <UTable columns={this.columns} data={this.dataList} size="small" bordered={false} />
      </>
    )
  }
})
