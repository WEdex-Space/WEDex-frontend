import { shortenAddress } from '@wedex/utils'
import { defineComponent } from 'vue'
import styles from './index.module.css'
import { useWalletStore } from '@/stores'

const WalletInfo = defineComponent({
  name: 'WalletInfo',
  setup() {
    const walletStore = useWalletStore()
    return () => (
      <div class="px-2 py-1 rounded border border-solid border-color-border bg-white cursor-pointer">
        {walletStore.connected ? (
          <div class="flex items-center">
            <div class={styles.connectedDot}></div>
            <div class="text-xs">
              <div class="text-grey3">
                {walletStore.address ? shortenAddress(walletStore.address) : ''}
              </div>
              <div class="text-grey3">{walletStore.chainName} connected</div>
            </div>
          </div>
        ) : (
          <div class="flex items-center py-1.5" onClick={() => walletStore.ensureWalletConnected()}>
            <div class={styles.unconnectedDot}></div>
            <span class="text-grey3">unconnected</span>
          </div>
        )}
      </div>
    )
  }
})

export default WalletInfo
