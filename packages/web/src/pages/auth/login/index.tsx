import { UButton } from '@WEDex/components'
import { WalletOutlined } from '@WEDex/icons'
import { defineComponent, ref } from 'vue'
import styles from './animate.module.css'
import logo from '@/assets/colorful.png'
import logo2 from '@/assets/colorful@2x.png'
import logo3 from '@/assets/colorful@3x.png'
import loginLogo from '@/assets/loginLogo.png'
import { useWalletStore } from '@/stores'

export default defineComponent({
  setup() {
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
      ensureWalletConnected,
      walletLogin
    }
  },
  render() {
    return (
      <>
        <div class="flex bg-[#EDEDF2] h-100vh w-100vw justify-center items-center">
          <div class="bg-white flex rounded-8px flex-1 h-542px max-w-1245px">
            <div
              class={`${styles.bgImage} bg-primary rounded-2px h-606px -mt-8 text-white ml-25 pt-212px pl-64px w-635px`}
            >
              <p style={{ color: 'rgba(255,255,255,0.5)' }} class=" font-semibold text-[16px]">
                Next generation all-in-one, <span class="text-[#ffffff]">Blockchain Economy</span>
              </p>
              <p class="font-bold mt-10px text-30px">BUIDLing and Launch Network</p>
              {/* <p class="font-bold mt-8px text-20px">to narrow the gap between rich and poor</p> */}
              <div class="mt-214px">
                <img src={loginLogo} class="w-28" alt="" />
              </div>
            </div>
            <div class="flex-1">
              <div class="mx-auto w-308px">
                <div class="mx-auto h-48px mt-60px mb-20px w-48px">
                  <img
                    src={logo}
                    srcset={`${logo}, ${logo2} 2x, ${logo3} 3x`}
                    alt="logo"
                    class="w-full"
                  />
                </div>
                <p class="font-bold text-center text-[#111111] text-28px">WEconomy</p>
                <p
                  class="mt-54px text-center mb-20px"
                  style={{
                    color: 'rgba(17, 17, 17, 0.6)'
                  }}
                >
                  WALLET
                </p>
                <UButton
                  class="mx-auto h-40px text-white text-center w-full text-16px relative"
                  size="small"
                  type="primary"
                  loading={this.loading}
                  onClick={this.walletLogin}
                >
                  <WalletOutlined class="h-20px top-10px left-17px w-20px absolute" />
                  Connect to a wallet
                </UButton>
                <div class="flex mt-10 mb-24px items-center">
                  <div class="bg-[#666] h-[1px] w-[140px]" />
                  <div
                    class="text-center text-[14px] leading-5 w-[40px]"
                    style={{ color: 'rgba(17,17,17,0.6)' }}
                  >
                    OR
                  </div>
                  <div class="bg-[#666] h-[1px] w-[140px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
})
