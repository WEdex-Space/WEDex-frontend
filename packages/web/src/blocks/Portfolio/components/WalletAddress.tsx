import { shortenAddress } from '@wedex/utils/src'
import { defineComponent, ref } from 'vue'
import { useWalletStore } from '@/stores'

export default defineComponent({
  name: 'WalletAddress',
  setup() {
    const walletStore = useWalletStore()
    const loading = ref(false)

    const walletLogin = async () => {
      loading.value = true
      try {
        await walletStore.ensureWalletConnected(true)
      } catch (error) {
        // do nothing
      }
      loading.value = false
    }

    return {
      walletStore,
      walletLogin
    }
  },
  render() {
    return (
      <div class="text-xs px-2 text-color3">
        {this.walletStore.connected ? (
          <span
            class="cursor-pointer text-color1 hover:text-primary"
            onClick={() => this.walletStore.test()}
          >
            {this.walletStore.address && shortenAddress(this.walletStore.address)}
          </span>
        ) : (
          <div class="text-right">
            <div class="cursor-pointer text-primary hover:opacity-90" onClick={this.walletLogin}>
              Connect Wallet
            </div>
            Non-custody and security
          </div>
        )}
      </div>
    )
  }
})
