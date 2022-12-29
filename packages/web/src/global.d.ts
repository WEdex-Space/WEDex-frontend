import type { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import type { TradingView } from './charting_library.d'

declare global {
  interface Window {
    ethereum: ExternalProvider & {
      // enable: () => Promise<any>
    }
    provider: Web3Provider
    TradingView: {
      widget: TradingView.IChartWidgetApi
    }
  }
}
