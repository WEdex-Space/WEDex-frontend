import {
  SwapOutlined,
  ShareOutlined,
  ArrowDownDoubleOutlined,
  ArrowRightOutlined
} from '@wedex/icons'
import { defineComponent, ref } from 'vue'
import PoolBlock from '@/blocks/DataDetail/components/PoolBlock'
import TradeBlock from '@/blocks/DataDetail/components/TradeBlock'

export default defineComponent({
  name: 'DetailEmbeddedBlock',
  setup(props, ctx) {
    const isStretch = ref(true)

    return {
      isStretch
    }
  },
  render() {
    return (
      <>
        <div class="border-color-border flex border-t-1 h-9 px-3 items-center">
          <span class="rounded-full bg-bg3 h-4 mr-1 w-4"></span>
          <span class="font-700 text-xs">Harmony</span>
          <ArrowRightOutlined class="h-3 mx-1 text-color3 w-3" />
          <span class="rounded-full bg-bg3 h-4 mr-1 w-4"></span>
          <span class="font-700 text-xs">Harmony</span>
          <div class="flex-1"></div>
          <ArrowDownDoubleOutlined
            class={`cursor-pointer h-4 text-color3 w-4 hover:text-color1 transform transition ${
              this.isStretch ? '' : 'rotate-180'
            }`}
            onClick={() => (this.isStretch = !this.isStretch)}
          />
        </div>
        {this.isStretch ? <TradeBlock /> : null}
        {this.isStretch ? <PoolBlock /> : null}
        <div class="bg-primary border-color-border cursor-pointer flex border-t-1 h-10 text-xs px-2.5 text-color1 items-center hover:bg-primary-bg hover:text-primary">
          <SwapOutlined class="h-4 w-4" />
          <div class="flex-1">Trade on WEDex</div>
          <ShareOutlined class="h-4 w-4" />
        </div>
      </>
    )
  }
})
