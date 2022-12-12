import {
  UStyleProvider,
  UHashInputProvider,
  UMessage,
  UMessageProvider,
  UUploadProvider,
  ULoadingBarProvider,
  ULoadingBar,
  UModalProvider
} from '@wedex/components'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import WalletBindBlock from './blocks/WalletBind'
import WalletConnectBlock from './blocks/WalletConnect'
import { upload as onUpload } from './services/a2s.adapter'
import { useUserStore, useWalletStore } from './stores'
import { comunionTimeAgo } from './utils/timeago'

export default defineComponent({
  name: 'App',
  setup() {
    const userStore = useUserStore()
    const walletStore = useWalletStore()
    comunionTimeAgo()

    // init user state
    userStore.init()
    // init wallet state
    walletStore.init()
    const onSearchHash = async (value: string, category: string) => {
      // TODO
      console.warn('APP: onSearchHash', value, category)
      return []
      // const { error, data } = await services['meta@tag-list']({
      //   isIndex: true,
      //   limit: 10,
      //   offset: 0,
      //   keyword: value,
      //   category
      // })
      // return error ? [] : data!.list.map(item => ({ label: item.name, value: item.id }))
    }
    return () => (
      <UStyleProvider>
        <UMessageProvider>
          <UMessage />
        </UMessageProvider>
        <ULoadingBarProvider>
          <ULoadingBar />
          <UUploadProvider onUpload={onUpload}>
            <UHashInputProvider onSearch={onSearchHash}>
              <UModalProvider>
                <RouterView />
              </UModalProvider>
            </UHashInputProvider>
          </UUploadProvider>
        </ULoadingBarProvider>
        <WalletConnectBlock />
        <WalletBindBlock />
      </UStyleProvider>
    )
  }
})
