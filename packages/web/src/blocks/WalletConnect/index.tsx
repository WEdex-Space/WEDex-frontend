import { UWalletConnect, UWalletConnectPropsType } from '@wedex/components'
import { defineComponent } from 'vue'
import { useUserStore, useWalletStore } from '@/stores'
const WalletConnectBlock = defineComponent({
  name: 'WalletConnectBlock',
  setup() {
    const walletStore = useWalletStore()
    const userStore = useUserStore()

    const onWalletClick: UWalletConnectPropsType['onClick'] = async type => {
      const wallet = await walletStore.onSelectWallet(type)
      console.warn(wallet, userStore.logged, userStore.is_connected_wallet)
      if (wallet && (!userStore.logged || !userStore.is_connected_wallet)) {
        const loginRes = await userStore.loginWithWalletAddress(wallet)
        console.log('onWalletClick loginRes', loginRes)
        if (loginRes) {
          walletStore.resolveWalletConnect(!!wallet)
        } else {
          walletStore.disconnectWallet()
        }
      } else {
        walletStore.resolveWalletConnect(!!wallet)
      }
    }

    const updateModalOpened = (value: boolean) => {
      walletStore.connectModalOpened = value
    }

    const onWalletCancel = () => {
      walletStore.closeConnectModal()
    }

    return () => (
      <UWalletConnect
        show={walletStore.connectModalOpened}
        onUpdateShow={updateModalOpened}
        onClick={onWalletClick}
        onClose={onWalletCancel}
      />
    )
  }
})

export default WalletConnectBlock
