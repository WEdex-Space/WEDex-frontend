import { defineStore } from 'pinia'
import storage from '@/utils/storage'

export type GlobalConfigState = {
  // current theme, default: light
  theme: 'light' | 'dark'
}

const localData: GlobalConfigState = (storage('globalConfig') as GlobalConfigState) || {}

export const useGlobalConfigStore = defineStore('globalConfig', {
  state: (): GlobalConfigState => ({
    theme: localData.theme || 'light'
  }),
  actions: {
    switchTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      storage('globalConfig', {
        theme: this.theme
      })
    }
  }
})
