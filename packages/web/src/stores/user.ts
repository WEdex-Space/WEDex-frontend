import { message } from '@wedex/components'
import { storage } from '@wedex/utils'
import { defineStore } from 'pinia'
import { STORE_KEY_TOKEN } from '@/constants'
import { services } from '@/services'
import { useWalletStore } from '@/stores'
import AbstractWallet from '@/wallets/AbstractWallet'

export type UserState = {
  // user token
  token: string | undefined
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: storage('local').get<string>(STORE_KEY_TOKEN)
  }),
  getters: {
    logged: state => !!state.token
  },
  actions: {
    refreshToken(token?: string) {
      this.token = token || storage('local').get<string>(STORE_KEY_TOKEN)
      storage('local').set(STORE_KEY_TOKEN, this.token as string)
    },
    async loginWithWalletAddress(wallet: AbstractWallet) {
      const walletAddress = await wallet.getAddress()
      const { error, data } = await services['Authorization@get-nonce-by-address']({
        walletAddress
      })
      if (!error) {
        let signedMsg
        try {
          signedMsg = await wallet.sign(data.nonce!)
        } catch (err) {
          console.error('Wallet sign errored', err)
          return false
        }
        const { error: tokenError, data: tokenData } = await services[
          'Authorization@login-by-wallet-address'
        ]({
          walletAddress,
          nonce: data.nonce!,
          signature: signedMsg
        })
        if (tokenError) {
          console.error('login-by-wallet-address fail')
          return false
        }
        if (tokenData?.token) {
          this.onLogin(tokenData?.token)
          return true
        } else {
          console.error('get token fail')
          return false
        }
      } else {
        console.error('Login failed when get nonce')
        return false
      }
    },
    onLogin(token: string) {
      storage('local').set(STORE_KEY_TOKEN, token)
      this.token = token
    },
    logout(msg?: false | string) {
      const walletStore = useWalletStore()
      this.token = ''
      storage('session').clear()
      storage('local').remove(STORE_KEY_TOKEN)
      walletStore.wallet && walletStore.disconnectWallet()
      if (msg) {
        message.info(typeof msg === 'string' ? msg : 'You have been logged out')
      }
    }
  }
})
