import type { ExternalProvider } from '@ethersproject/providers'
import { hexValue } from 'ethers/lib/utils'
import AbstractWallet from './AbstractWallet'
import { MetamaskProvider } from './provider/MetamaskProvider'
import { allNetworks, ChainNetworkType } from '@/constants'
let _instance: MetamaskWallet | undefined
type metaMaskType = {
  providers: Array<{
    _metamask?: () => void | undefined
    request?: (request: { method: string }) => Promise<any>
  }>
  request?: (request: { method: string }) => Promise<any>
}

export default class MetamaskWallet extends AbstractWallet {
  constructor() {
    super('Metamask', new MetamaskProvider(window.ethereum))
  }

  static getInstance(): AbstractWallet | undefined {
    if (!_instance) {
      if (!MetamaskWallet.checkAvaliable()) {
        window.open('https://metamask.io/', 'metamask')
        return undefined
      }
      _instance = new MetamaskWallet()
    }
    return _instance
  }

  static checkAvaliable(): boolean {
    return !!window.ethereum
  }
  prepare() {
    const ethereum = window.ethereum as metaMaskType
    const prepareFn = ethereum?.providers?.find(item => item._metamask) || ethereum
    if (prepareFn) {
      return prepareFn?.request?.({ method: 'eth_requestAccounts' })
    }
    return undefined
  }
  async addNetwork(network: ChainNetworkType): Promise<boolean> {
    if (!window.ethereum) return Promise.resolve(false)
    try {
      await (window.ethereum as ExternalProvider).request!({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: hexValue(network.chainId),
            chainName: network.name,
            nativeCurrency: {
              name: network.currencySymbol,
              symbol: network.currencySymbol,
              decimals: 18
            },
            rpcUrls: [network.rpcUrl],
            blockExplorerUrls: [network.explorerUrl],
            iconUrls: []
          }
        ]
      })
      return true
    } catch (addError) {
      console.error(addError)
      return false
    }
  }
  async switchNetwork(chainId: number): Promise<boolean> {
    try {
      await (window.ethereum as ExternalProvider).request!({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexValue(chainId) }]
      })
      return true
    } catch (e: any) {
      if (e.code === 4902) {
        const added = await this.addNetwork(allNetworks.find(n => n.chainId === chainId)!)
        if (added) {
          return this.switchNetwork(chainId)
        }
        return false
      }
      console.error(e)
      return false
    }
  }
}
