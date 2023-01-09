import { useElementSize } from '@vueuse/core'
import { storage } from '@wedex/utils'
import { defineComponent, ref, onMounted } from 'vue'
import { DataFeed } from '../datafeed'
import { fetchSymbols, IApiSymbol } from '../services'
import { services } from '@/services'
import { useGlobalConfigStore } from '@/stores'

const Resolution = {
  '1': { name: '1m' },
  '5': { name: '5m' },
  '30': { name: '30m' },
  '60': { name: '1h' },
  '240': { name: '4h' },
  '360': { name: '6h' },
  '1440': { name: '24h' }
}

export default defineComponent({
  name: 'TradingView',
  props: {
    pairId: {
      type: String
    }
  },
  setup() {
    const globalConfigStore = useGlobalConfigStore()
    const interval = ref<keyof typeof Resolution>('5')
    const container = ref()
    const widget = ref<TradingView.IChartingLibraryWidget>()
    const datafeed = ref<DataFeed>()
    const info = ref<IApiSymbol>()
    const infoRef = ref(info)
    const { width } = useElementSize(container)

    const init = async () => {
      const res = await fetchSymbols()
      if (!Array.isArray(res)) return
      const obj: Record<string, IApiSymbol> = {}
      for (let i = 0; i < res.length; i++) {
        const item = res[i]
        if (
          item.state === 'online' &&
          item['quote-currency'] === 'usdt' &&
          !/\d/.test(item['base-currency'])
        ) {
          obj[item['base-currency']] = item
        }
      }
      const arr = Object.keys(obj).sort()
      const newList = arr.map(k => obj[k])
      const newInfo = newList.find(e => {
        return e.symbol === 'btcusdt'
      })
      info.value = newInfo || newList[0]
      initDatafeed(newInfo || newList[0])
      initTradingView(newInfo || newList[0])
    }

    const initDatafeed = (data?: IApiSymbol) => {
      const currentInfo = data || info.value
      if (!currentInfo) return
      const display_name = `${currentInfo['base-currency'].toLocaleUpperCase()}/${currentInfo[
        'quote-currency'
      ].toLocaleUpperCase()}`
      const supported_resolutions = Object.keys(Resolution) as never
      datafeed.value = new DataFeed({
        SymbolInfo: {
          name: display_name,
          full_name: display_name,
          description: '',
          type: 'stock',
          session: '24x7',
          exchange: '',
          listed_exchange: '',
          timezone: 'Asia/Shanghai',
          format: 'price',
          pricescale: Math.pow(10, currentInfo['price-precision']),
          minmov: 1,
          volume_precision: currentInfo['value-precision'],
          has_intraday: true,
          supported_resolutions: supported_resolutions,
          has_weekly_and_monthly: true,
          has_daily: true
        },
        DatafeedConfiguration: {
          supported_resolutions: supported_resolutions
        },
        getBars: getBars
      })
    }

    const getBars = async (
      symbolInfo: TradingView.LibrarySymbolInfo,
      resolution: TradingView.ResolutionString,
      periodParams: TradingView.PeriodParams,
      onResult: TradingView.HistoryCallback,
      onError: TradingView.ErrorCallback
    ) => {
      const bars: TradingView.Bar[] = []
      const size = window.innerWidth
      if (!periodParams.firstDataRequest) {
        onResult(bars, { noData: true })
        return
      }
      if (resolution !== interval.value) {
        // unsubscribeKLine();
        interval.value = resolution as keyof typeof Resolution
      }
      const { error, data } = await services['Pair@get-kline-list']({
        pairId: '63a7d22e900600006d001823',
        type: Resolution[interval.value].name,
        size: size > 2000 ? 2000 : size
      })

      const res = !error && infoRef.value ? data.list : null
      if (!Array.isArray(res)) {
        onResult(bars, { noData: true })
        return
      }
      for (let i = 0; i < res.length; i++) {
        const item = res[i]
        bars.push({
          time: item.happenAt * 1000,
          open: item.priceStart,
          high: item.priceMax,
          low: item.priceMin,
          close: item.priceEnd,
          volume: item.volume
        })
      }
      bars.sort((l, r) => (l.time > r.time ? 1 : -1))
      if (periodParams.firstDataRequest) {
        // subscribeKLine();
      }
      onResult(bars)
    }

    const initTradingView = (data?: IApiSymbol) => {
      console.log('initTradingView width=', width.value)
      // remove local theme
      storage('local').remove('tradingview.current_theme.name')

      const currentInfo = data || info.value
      widget.value = new window.TradingView.widget({
        symbol: currentInfo?.symbol,
        interval: interval.value as never,
        container: container.value!,
        autosize: true,
        datafeed: datafeed.value!,
        preset: width.value < 600 ? 'mobile' : undefined,
        library_path: '/charting_library/',
        theme: globalConfigStore.theme,
        loading_screen: {
          backgroundColor: globalConfigStore.theme === 'dark' ? '#181a1f' : '#fff',
          foregroundColor: '#FF9D00'
        },
        // enabled_features
        disabled_features: [
          'header_symbol_search',
          'symbol_search_hot_key',
          'header_compare',
          'header_interval_dialog_button'
        ],
        custom_css_url: '/charting_library/custom_css.css'
      })
    }

    onMounted(() => {
      setTimeout(init, 0)
    })

    return {
      container
    }
  },
  render() {
    return (
      <div ref={ref => (this.container = ref)} class={`bg-bg1`}>
        TradingView
      </div>
    )
  }
})
