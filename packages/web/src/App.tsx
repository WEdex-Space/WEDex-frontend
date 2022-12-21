import {
  UStyleProvider,
  UMessage,
  UMessageProvider,
  UUploadProvider,
  ULoadingBarProvider,
  ULoadingBar,
  UModalProvider
} from '@WEDex/components'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import WalletConnectBlock from './blocks/WalletConnect'
import { upload as onUpload } from './services/a2s.adapter'
import { useWalletStore, useGlobalConfigStore } from './stores'
import { customTimeAgo } from './utils/timeago'

export default defineComponent({
  name: 'App',
  setup() {
    const walletStore = useWalletStore()
    const globalConfigStore = useGlobalConfigStore()

    customTimeAgo()

    // init wallet state
    walletStore.init()

    return () => (
      <UStyleProvider theme={globalConfigStore.theme}>
        <UMessageProvider>
          <UMessage />
        </UMessageProvider>
        <ULoadingBarProvider>
          <ULoadingBar />
          <UUploadProvider onUpload={onUpload}>
            <UModalProvider>
              <RouterView />
            </UModalProvider>
          </UUploadProvider>
        </ULoadingBarProvider>
        <WalletConnectBlock />
      </UStyleProvider>
    )
  }
})
