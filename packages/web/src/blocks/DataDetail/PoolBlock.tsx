import { UAddress } from '@wedex/components'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PoolBlock',
  setup(props, ctx) {
    const dataList = ref<any[]>([
      {
        label: 'Liquidity',
        content: '$233'
      },
      {
        label: 'Pair',
        content: (
          <UAddress
            address="3313123131"
            class="w-full"
            blockchainExplorerUrl="https://cchain.explorer.avax-test.network"
          />
        )
      },
      {
        label: 'Token0',
        content: (
          <UAddress
            address="3313123131"
            class="w-full"
            blockchainExplorerUrl="https://cchain.explorer.avax-test.network"
          />
        )
      },
      {
        label: 'Token1',
        content: (
          <UAddress
            address="3313123131"
            class="w-full"
            blockchainExplorerUrl="https://cchain.explorer.avax-test.network"
          />
        )
      },
      {
        label: 'Pooled Token0',
        content: '$233'
      },
      {
        label: 'Pooled Token1',
        content: '$233'
      },
      {
        label: 'Created',
        content: '1d 8h ago'
      }
    ])

    return {
      dataList
    }
  },
  render() {
    return (
      <div class="pb-2">
        <div class="flex h-9 px-3 items-center">
          <div class="flex-1 font-700 text-primary">Pool</div>
        </div>

        <div class="text-xs px-3 leading-6">
          {this.dataList.map(item => (
            <div class="flex items-center">
              <div class="mr-1 text-color3">{item.label}:</div>
              <div class="flex flex-1 items-center">{item.content}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
})
