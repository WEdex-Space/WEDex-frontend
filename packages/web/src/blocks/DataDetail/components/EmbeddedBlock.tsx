import {
  SwapOutlined,
  ShareOutlined,
  ArrowDownDoubleOutlined,
  ArrowRightOutlined
} from '@wedex/icons'
import { defineComponent, ref } from 'vue'
import PairActionBlock from '@/blocks/DataDetail/components/PairActionBlock'
import PoolBlock from '@/blocks/DataDetail/components/PoolBlock'
import TokenInfoBlock from '@/blocks/DataDetail/components/TokenInfoBlock'
import TradeBlock from '@/blocks/DataDetail/components/TradeBlock'
import { usePair } from '@/hooks'

export default defineComponent({
  name: 'DetailEmbeddedBlock',
  props: {
    pairId: {
      type: String
    }
  },
  setup(props, ctx) {
    const isStretch = ref(true)
    const Pair = usePair()

    return {
      isStretch,
      currentPair: Pair.current
    }
  },
  render() {
    return (
      <div class="relative overflow-y-auto">
        {/* drag bar */}
        <div class="cursor-move h-3 transition-all top-0 right-0 left-0 absolute hover:opacity-60">
          <span class="rounded-sm bg-bg1 h-1 -mt-0.5 -ml-8 top-[50%] left-[50%] w-16 absolute"></span>
        </div>
        <div class="border-color-border flex bg-bg3 border-t-1 h-11 px-3 items-center">
          <span class="rounded-full bg-bg2 h-4 mr-1 w-4 overflow-hidden">
            <img src={this.currentPair?.token[0].logo} class="h-full w-full" />
          </span>
          <span class="font-700 text-xs">{this.currentPair?.token[0].symbol}</span>
          <ArrowRightOutlined class="h-3 mx-1 text-color3 w-3" />
          <span class="rounded-full bg-bg2 h-4 mr-1 w-4 overflow-hidden">
            <img src={this.currentPair?.token[1].logo} class="h-full w-full" />
          </span>
          <span class="font-700 text-xs">{this.currentPair?.token[1].symbol}</span>
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
            <PairActionBlock />
            <PoolBlock />
            <TokenInfoBlock pairId={this.pairId} />
          </>
        ) : null}

        <div class="bg-primary-bg border-color-border cursor-pointer flex border-t-1 h-10 text-primary text-xs px-2.5 items-center hover:bg-primary hover:text-white">
          <SwapOutlined class="h-4 w-4" />
          <div class="flex-1">Trade on WEDex</div>
          <ShareOutlined class="h-4 w-4" />
        </div>
      </div>
    )
  }
})
