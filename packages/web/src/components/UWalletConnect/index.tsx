import { defineComponent } from 'vue'
import { default as UWalletConnect, UWalletConnectPropsType } from './WalletConnect'
import { useUserStore, useWalletStore } from '@/stores'

const WalletConnectBlock = defineComponent({
  name: 'WalletConnectBlock',
  setup() {
    const walletStore = useWalletStore()
    const userStore = useUserStore()

    const onWalletClick: UWalletConnectPropsType['onClick'] = async type => {
      const wallet = await walletStore.onSelectWallet(type)
      console.warn(wallet, userStore.logged, walletStore.connected)
      // wallet &&
      //   walletStore.getBalance(await wallet.getAddress()).then(balance => console.log(balance))

      if (wallet && (!userStore.logged || !walletStore.connected)) {
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

    return () => (
      <UWalletConnect
        show={walletStore.connectModalOpened}
        onUpdateShow={updateModalOpened}
        onClick={onWalletClick}
        onClose={() => {
          walletStore.closeConnectModal()
        }}
      />
    )
  }
})

export default WalletConnectBlock
