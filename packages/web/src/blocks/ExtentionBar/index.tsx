import {
  SearchOutlined,
  ListOutlined,
  WalletOutlined,
  PenOutlined,
  MultiOutlined,
  NotificationOutlined,
  ThemeDarkOutlined,
  ThemeLightOutlined,
  TelegramFilled,
  DiscordFilled,
  TwitterFilled
} from '@wedex/icons'
import { defineComponent, inject, ref } from 'vue'
import Alerts from '@/blocks/Alerts'
import MultiChart from '@/blocks/MultiChart'
import Notebook from '@/blocks/Notebook'
import Portfolio from '@/blocks/Portfolio'
import Search from '@/blocks/Search'
import WatchList from '@/blocks/WatchList'

import { useGlobalConfigStore } from '@/stores'

export default defineComponent({
  name: 'ExtentionBar',
  setup() {
    const globalConfigStore = useGlobalConfigStore()
    const currentExpand = inject<string>('currentExpand')
    const currentExtention = ref<string | null>('WatchList')

    return {
      currentExpand,
      currentExtention,
      globalConfigStore
    }
  },
  render() {
    const iconClass = 'w-full h-full align-top'

    const componentsMap: {
      [key: string]: any
    } = {
      Search: {
        component: <Search />,
        icon: <SearchOutlined class={iconClass} />
      },
      WatchList: {
        component: <WatchList />,
        icon: <ListOutlined class={iconClass} />
      },
      Portfolio: {
        component: <Portfolio />,
        icon: <WalletOutlined class={iconClass} />
      },
      Notebook: {
        component: <Notebook />,
        icon: <PenOutlined class={iconClass} />
      },
      MultiChart: {
        component: <MultiChart />,
        icon: <MultiOutlined class={iconClass} />
      },
      Alerts: {
        component: <Alerts />,
        icon: <NotificationOutlined class={iconClass} />
      },
      Theme: {
        icon:
          this.globalConfigStore.theme === 'dark' ? (
            <ThemeLightOutlined class={iconClass} />
          ) : (
            <ThemeDarkOutlined class={iconClass} />
          ),
        action: () => {
          this.globalConfigStore.switchTheme()
        }
      }
    }

    const toggleExtention = (name: string) => {
      if (this.currentExtention !== name) {
        this.currentExtention = name
      }
    }
    // share
    const shareTypes = [
      {
        title: 'telegram',
        icon: <TelegramFilled class={iconClass} />
      },
      {
        title: 'discord',
        icon: <DiscordFilled class={iconClass} />
      },
      {
        title: 'twitter',
        icon: <TwitterFilled class={iconClass} />
      }
    ]

    return (
      <div class="border-color-border flex border-l-1">
        <div class="flex-1 overflow-hidden">
          {this.currentExtention && componentsMap[this.currentExtention].component}
        </div>
        {/* icons */}
        <div class="border-color-border flex flex-col border-l-1 w-11">
          <div class="flex-1 overflow-hidden">
            {Object.keys(componentsMap).map((key: string) => (
              <div
                class={`rounded-sm cursor-pointer mx-auto h-8 my-3 text-center text-color3 leading-8  w-8 hover:bg-bg2 hover:text-color1 ${
                  this.currentExtention === key ? 'bg-bg2 text-color1' : ''
                }`}
                onClick={() =>
                  typeof componentsMap[key].action === 'function'
                    ? componentsMap[key].action()
                    : componentsMap[key].component && toggleExtention(key)
                }
              >
                <div class={`h-4 w-4 inline-block align-middle -mt-[2px]`}>
                  {componentsMap[key].icon}
                </div>
              </div>
            ))}
          </div>

          {shareTypes.map(item => (
            <div class="rounded-sm cursor-pointer mx-auto h-8 my-3 text-center text-color3 leading-8  w-8 hover:bg-bg2 hover:text-color1">
              <div class={`h-4 w-4 inline-block align-middle -mt-[2px]`}>{item.icon}</div>
            </div>
          ))}
          <div class="bg-[#262626] h-10 text-center text-[12px] leading-10">WEDex</div>
        </div>
      </div>
    )
  }
})
