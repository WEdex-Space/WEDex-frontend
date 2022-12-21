import { message } from '@WEDex/components'
import { useWalletStore } from '@/stores'
import { getChainInfoByChainId } from '@/utils/etherscan'

// Check wallet network against chainId
export async function checkSupportNetwork(
  chainId: number,
  callback?: (result: boolean, walletRes?: any) => void
) {
  const walletStore = useWalletStore()
  const chainInfo = getChainInfoByChainId(chainId)
  if (chainId && walletStore.chainId !== chainId) {
    await walletStore.ensureWalletConnected()
    message.warning(`Please switch to ${chainInfo?.name}`)
    // not supported network, try to switch
    walletStore.openNetworkSwitcher()
    walletStore.wallet?.switchNetwork(chainId).then(res => {
      typeof callback === 'function' && callback(false, res)
    })
    return false
  } else {
    typeof callback === 'function' && callback(true)
    return true
  }
}
