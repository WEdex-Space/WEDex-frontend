import { defineComponent } from 'vue'
import Assets from './components/Assets'
import Empty from './components/Empty'
import WalletAddress from './components/WalletAddress'
import { useWalletStore } from '@/stores'

export default defineComponent({
  name: 'Portfolio',
  setup() {
    const walletStore = useWalletStore()

    return {
      walletStore
    }
  },
  render() {
    return (
      <div class="flex flex-col h-full relative">
        <div class="border-color-border flex border-b-1 h-14 items-center">
          <strong class="flex-1 mx-5">Portfolio</strong>
          <WalletAddress />
        </div>
        {this.walletStore.connected ? <Assets /> : <Empty />}
      </div>
    )
  }
})
