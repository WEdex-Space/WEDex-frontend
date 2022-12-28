import AbstractWallet from './AbstractWallet'
import { WalletConnectProvider } from './provider/WalletConnectProvider'
import { ChainNetworkType, WALLET_INFURA_ID } from '@/constants'
import { useWalletStore } from '@/stores'
let _instance: WalletConnectWallet | undefined

export default class WalletConnectWallet extends AbstractWallet {
  walletConnectProvider: WalletConnectProvider
  constructor() {
    // const walletConnectProvider = new WalletConnectProvider({
    //   // export const infuraNetworks = {
    //   //   1: "mainnet",
    //   //   3: "ropsten",
    //   //   4: "rinkeby",
    //   //   5: "goerli",
    //   //   42: "kovan",
    //   // };
    //   chainId: 1,
    //   client: {
    //     logger: 'debug',
    //     relayUrl: 'wss://relay.walletconnect.com',
    //     projectId: 'e6df27a37720674f7f88a859dd72a026'
    //   }
    // })
    // get infuraId is open https://infura.io/zh There will be a prompt for a response after registration
    // just go step by step
    const provider = new WalletConnectProvider({
      infuraId: WALLET_INFURA_ID
    })

    super('WalletConnect', provider)
    this.walletConnectProvider = provider
  }
  static getInstance(): AbstractWallet | undefined {
    if (!_instance) {
      _instance = new WalletConnectWallet()
    }
    return _instance
  }
  static checkAvaliable(): boolean {
    return true
  }
  async prepare() {
    try {
      this.walletConnectProvider = new WalletConnectProvider({
        infuraId: WALLET_INFURA_ID
      })
      this._provider = this.walletConnectProvider
      const addressList = await this.walletConnectProvider._wcProvider.enable()
      return addressList?.[0]
    } catch (error) {
      const WalletStore = useWalletStore()
      WalletStore.closeConnectModal()
      return undefined
    }
  }
  addNetwork(network: ChainNetworkType): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  switchNetwork(chainId: number): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
