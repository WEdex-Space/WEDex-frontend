import { message } from '@wedex/components'
import { storage } from '@wedex/utils'
import { ethers, getDefaultProvider, providers } from 'ethers'
import { defineStore } from 'pinia'
import { markRaw } from 'vue'
import { useUserStore } from './user'
import {
  STORE_KEY_WALLET_CONNECTED,
  STORE_KEY_WALLET_TYPE,
  allNetworks,
  STORE_KEY_WALLET_CONSTAST_TYPE,
  supportedNetworks
} from '@/constants'
import router from '@/router'
import { ServiceReturn, services } from '@/services'
import { SupportedWalletTypes } from '@/types/wallet'
import { getWallet } from '@/wallets'
import AbstractWallet from '@/wallets/AbstractWallet'

export type coinbaseProvider = {
  ethereum: any
}
export type WalletState = {
  // wallet address
  address?: string
  // current chain id
  chainId?: number
  // current chain name
  chainName?: string
  // connected wallet type
  walletType?: SupportedWalletTypes
  // wallet instance
  wallet?: AbstractWallet
  // is wallet connect modal opened
  connectModalOpened: boolean
  // bind wallet modal opened
}
export type coinbaseWindowType = {
  providers: Array<{
    close: () => void
  }>
}
// promise resolve
let _resolve: (() => void) | undefined
let _reject: (() => void) | undefined
// bind cb
let bindCbSuccess!: (params: ServiceReturn<'Authorization@login-by-wallet-address'>) => void
let bindCbFailed!: () => void
// hack
let _openNetworkSwitcher: () => void | undefined

export const useWalletStore = defineStore('wallet', {
  state: (): WalletState => ({
    address: undefined,
    chainId: undefined,
    chainName: undefined,
    walletType: storage('local').get<NonNullable<WalletState['walletType']>>(STORE_KEY_WALLET_TYPE),
    wallet: undefined,
    connectModalOpened: false
  }),
  getters: {
    connected: state => !!state.address,
    isNetworkSupported: state => {
      let status = false
      supportedNetworks.forEach(item => {
        if (item.chainId === state.chainId) {
          status = true
        }
      })
      return status
    },
    blockchainExplorerUrl: state => allNetworks.find(n => n.chainId === state.chainId)?.explorerUrl
  },
  actions: {
    async test() {
      const provider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com')
      this.address &&
        (await provider.getBalance(this.address).then((res: any) => {
          console.log(res, ethers.utils.formatUnits(res, 18))
        }))
    },
    async init(reload = false) {
      return new Promise((resolve, reject) => {
        if (this.connected && !reload) return resolve(true)
        const isConnected = storage('local').get<string>(STORE_KEY_WALLET_CONNECTED)
        // auto connect when previous session is connected
        if (isConnected && this.walletType) {
          getWallet(this.walletType).then(wallet => {
            if (wallet) {
              this._onWallectConnect(wallet).then(res => {
                console.warn('_onWallectConnect callback:', res)
                resolve(res)
              })
            } else {
              reject('catch wallet 1')
            }
          })
        }
      })
    },
    async _onWallectConnect(wallet: AbstractWallet) {
      console.warn('_onWallectConnect', wallet)
      this.wallet = markRaw(wallet)
      this.address = await wallet.getAddress()
      const network = await wallet.getProvider().getNetwork()
      this.chainId = network.chainId
      this.chainName = network.name
      this.walletType = storage('local').get(STORE_KEY_WALLET_TYPE)
      this._addEventListeners(this.wallet.getProvider())
      return network
    },
    _addEventListeners(provider: providers.JsonRpcProvider) {
      provider.on('account', this._onAccountsChanged)
      provider.on('network', this._onNetworkChange)
    },
    _removeEventListeners() {
      const provider = this.wallet?.getProvider()
      if (provider) {
        provider.off('account', this._onAccountsChanged)
        provider.off('network', this._onNetworkChange)
      }
    },
    _onAccountsChanged(account: string, oldAccount: string) {
      const userStore = useUserStore()
      // change address means change user, so we need to disconnect
      console.log('You have changed the account', account, oldAccount)
      if (account) {
        this.address = account
      } else {
        this.disconnectWallet()
      }
      // account switched
      if (
        account &&
        oldAccount &&
        account !== oldAccount &&
        window.location.pathname !== '/auth/login'
      ) {
        message.info('Account switched, please re-login')
        userStore.logout()
        router.replace('/auth/login')
      }
    },
    disconnectWallet() {
      const providers = (window.ethereum as coinbaseWindowType)?.providers || []
      providers.map(item => {
        item.close && item.close()
      })
      storage('local').remove(STORE_KEY_WALLET_CONNECTED)
      this.address = undefined
      this.chainId = undefined
      this.chainName = undefined
      this.walletType = undefined
      storage('local').remove(STORE_KEY_WALLET_TYPE)
      this.wallet = undefined
      this._removeEventListeners()
    },
    async _onNetworkChange(newNetwork: any, oldNetwork: any) {
      console.log('You have changed the network', newNetwork, oldNetwork)
      const network = await this.wallet!.getProvider().getNetwork()
      this.chainId = network.chainId
      this.chainName = network.name
      // The data comes from the interface and does not need to refresh the page
      // if (newNetwork?.chainId) {
      //   setTimeout(() => {
      //     location.reload()
      //   }, 100)
      // }
    },
    openConnectModal() {
      this.connectModalOpened = true
    },
    closeConnectModal() {
      this.connectModalOpened = false
      this.resolveWalletConnect(false)
    },
    async onSelectWallet(walletType: SupportedWalletTypes) {
      /**
       * when change wallet You need to close coinbase wallet connect
       */
      const wallet = await getWallet(walletType)
      const WALLET_CONSTAST_TYPE = storage('local').get<string>(STORE_KEY_WALLET_CONSTAST_TYPE)
      const userStore = useUserStore()

      if (
        WALLET_CONSTAST_TYPE &&
        WALLET_CONSTAST_TYPE !== walletType &&
        window.location.pathname !== '/auth/login'
      ) {
        this.disconnectWallet()
        storage('local').remove(STORE_KEY_WALLET_CONSTAST_TYPE)
        message.info('Account switched, please re-login')
        userStore.logout()
        router.replace('/auth/login')
        return undefined
      }
      if (wallet) {
        this._onWallectConnect(wallet)
        storage('local').set(STORE_KEY_WALLET_TYPE, walletType)
        storage('local').set(STORE_KEY_WALLET_CONNECTED, 1)
        // STORE_KEY_WALLET_CONSTAST_TYPE need to compare your wallet choices
        storage('local').set(STORE_KEY_WALLET_CONSTAST_TYPE, walletType)
      }
      this.connectModalOpened = false
      return wallet
    },
    resolveWalletConnect(resolved: boolean) {
      if (resolved) {
        _resolve?.()
        _resolve = undefined
      } else {
        _reject?.()
        _reject = undefined
      }
    },
    async ensureWalletConnected(force = false) {
      return new Promise<void>((resolve, reject) => {
        if (!this.connected || force) {
          this.openConnectModal()
          _resolve = resolve
          _reject = reject
        } else {
          resolve()
        }
      })
    },
    async bindWallet(wallet: AbstractWallet) {
      const address = await wallet.getAddress()
      const { error, data } = await services['Authorization@get-nonce-by-address']({
        walletAddress: address
      })
      if (!error) {
        try {
          const signature = await wallet.sign(data!.nonce!)
          return new Promise(() => {
            services['Authorization@login-by-wallet-address']({
              address,
              signature,
              skipMessage: true,
              nonce: data.nonce!
            } as any).then((response: any) => {
              if (response.error) {
                if (response.code === 400) {
                  message.error('The wallet account has been connected')
                }
                if (bindCbFailed && typeof bindCbFailed === 'function') {
                  bindCbFailed()
                }
                return
              }
              if (bindCbSuccess && typeof bindCbSuccess === 'function') {
                bindCbSuccess(response.data)
              }
            })
          })
        } catch (error) {
          console.error('Wallet sign errored')
          return
        }
      }
    },
    // open network switcher
    openNetworkSwitcher() {
      _openNetworkSwitcher?.()
    },
    // set network switcher function
    setOpenNetworkSwitcher(fn: () => void) {
      _openNetworkSwitcher = fn
    },
    async getBalance(address: string): Promise<string> {
      const provider = this.wallet?.getProvider()
      if (provider) {
        try {
          const balance = await provider.getBalance(address)
          const etherString = ethers.utils.formatEther(balance)
          return etherString
        } catch (error) {
          console.log('error', error)
          return '0'
        }
      }
      return '0'
    },
    getRpcProvider(chainId: number, key: string) {
      getDefaultProvider
      const networkInfo = allNetworks.find(network => network.chainId === chainId)
      if (!networkInfo) return
      let rpc = networkInfo.rpcUrl
      if ([1, 5].includes(chainId)) {
        rpc += key
      }
      const provider = new ethers.providers.JsonRpcProvider(rpc)
      return provider
    }
  }
})

export type WalletStore = ReturnType<typeof useWalletStore>
