import { defineComponent, ref } from 'vue'
import { useUserStore, useWalletStore } from '@/stores'

export default defineComponent({
  name: 'SyncLink',
  setup(props) {
    const userStore = useUserStore()
    const walletStore = useWalletStore()
    const loading = ref(false)

    const { ensureWalletConnected } = walletStore
    const walletLogin = async () => {
      loading.value = true
      try {
        await ensureWalletConnected(true)
      } catch (error) {
        // do nothing
      }
      loading.value = false
    }

    return {
      loading,
      walletLogin,
      logged: userStore.logged
    }
  },
  render() {
    return this.logged ? null : (
      <div class="cursor-default flex text-xs py-4 text-color3 justify-end select-none">
        Sync to cloud,
        <span class="cursor-pointer text-primary px-2 hover:opacity-90" onClick={this.walletLogin}>
          Connect Wallet{' '}
        </span>
      </div>
    )
  }
})
