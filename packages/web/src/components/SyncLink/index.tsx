import { defineComponent, ref, watch } from 'vue'
import { useUserStore, useWalletStore } from '@/stores'

export default defineComponent({
  name: 'SyncLink',
  emits: ['linkState'],
  setup(props, ctx) {
    const userStore = useUserStore()
    const walletStore = useWalletStore()
    const loading = ref(false)

    const walletLogin = async () => {
      loading.value = true
      try {
        await walletStore.ensureWalletConnected(true)
      } catch (error) {
        // do nothing
      }
      loading.value = false
    }

    watch(
      () => userStore.logged,
      value => {
        ctx.emit('linkState', value)
      },
      {
        immediate: true
      }
    )

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
