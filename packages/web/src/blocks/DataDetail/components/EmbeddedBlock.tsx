import {
  SwapOutlined,
  ShareOutlined,
  ArrowDownDoubleOutlined,
  ArrowRightOutlined
} from '@wedex/icons'
import { defineComponent, ref } from 'vue'
import PoolBlock from '@/blocks/DataDetail/components/PoolBlock'
import TokenInfoBlock from '@/blocks/DataDetail/components/TokenInfoBlock'
import TradeBlock from '@/blocks/DataDetail/components/TradeBlock'

export default defineComponent({
  name: 'DetailEmbeddedBlock',
  props: {
    pairId: {
      type: String
    }
  },
  setup(props, ctx) {
    const isStretch = ref(true)

    return {
      isStretch
    }
  },
  render() {
    return (
      <>
        <div class="border-color-border flex bg-bg3 border-t-1 h-11 px-3 items-center">
          <span class="rounded-full bg-bg2 h-4 mr-1 w-4"></span>
          <span class="font-700 text-xs">Harmony</span>
          <ArrowRightOutlined class="h-3 mx-1 text-color3 w-3" />
          <span class="rounded-full bg-bg2 h-4 mr-1 w-4"></span>
          <span class="font-700 text-xs">Harmony</span>
          <div class="flex-1"></div>
          <ArrowDownDoubleOutlined
            class={`cursor-pointer h-5 text-color1 hover:text-color3 transform transition ${
              this.isStretch ? '' : 'rotate-180'
            }`}
            onClick={() => (this.isStretch = !this.isStretch)}
          />
        </div>
        {this.isStretch ? (
          <>
            <TradeBlock />
            <PoolBlock />
            <TokenInfoBlock pairId={this.pairId} />
          </>
        ) : null}

        <div class="bg-primary border-color-border cursor-pointer flex border-t-1 h-10 text-xs text-white px-2.5 items-center hover:bg-primary-bg hover:text-primary">
          <SwapOutlined class="h-4 w-4" />
          <div class="flex-1">Trade on WEDex</div>
          <ShareOutlined class="h-4 w-4" />
        </div>
      </>
    )
  }
})
