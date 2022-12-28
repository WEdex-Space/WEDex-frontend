import type AbstractWallet from './AbstractWallet'
import CoinbaseWallet from './CoinbaseWallet'
import MetamaskWallet from './Metamask'
import WalletConnectWallet from './WalletConnect'

import type { SupportedWalletTypes } from '@/types/wallet'
const MetaMaskInstance = MetamaskWallet.getInstance
const WalletConnectInstance = WalletConnectWallet.getInstance
const CoinbaseInstance = CoinbaseWallet.getInstance

export async function getWallet(
  walletName: SupportedWalletTypes
): Promise<AbstractWallet | undefined> {
  const walletGroup = [
    {
      name: 'MetaMask',
      walletFn: MetaMaskInstance
    },
    {
      name: 'WalletConnect',
      walletFn: WalletConnectInstance
    },
    {
      name: 'TrustWallet',
      walletFn: WalletConnectInstance
    },
    {
      name: 'Coinbase Wallet',
      walletFn: CoinbaseInstance
    }
  ]
  const wallet = walletGroup.find(item => item.name === walletName)?.walletFn?.()
  if (!wallet) return undefined
  try {
    await (wallet as AbstractWallet).prepare()
    return wallet as AbstractWallet
  } catch (error) {
    console.error('Error when auto init', error)
    return undefined
  }
}
