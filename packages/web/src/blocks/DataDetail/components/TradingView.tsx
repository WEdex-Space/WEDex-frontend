import { useElementSize } from '@vueuse/core'
import { defineComponent, ref, onMounted } from 'vue'
import { DataFeed } from '../datafeed'
import { fetchKLine, fetchSymbols, IApiSymbol } from '../services'
import { useGlobalConfigStore } from '@/stores'

const Resolution = {
  '1': { server: '1min', name: '1m' },
  '5': { server: '5min', name: '5m' },
  '30': { server: '30min', name: '30m' },
  '60': { server: '60min', name: '1h' },
  '240': { server: '4hour', name: '4h' },
  '360': { server: '6hour', name: '6h' },
  '1440': { server: '1day', name: '1D' },
  '10080': { server: '1week', name: '1W' },
  '302400': { server: '1mon', name: '1M' }
}

export default defineComponent({
  name: 'TradingView',
  setup() {
    const globalConfigStore = useGlobalConfigStore()
    const interval = ref<keyof typeof Resolution>('5')
    const container = ref()
    const widget = ref<TradingView.IChartingLibraryWidget>()
    const datafeed = ref<DataFeed>()
    const info = ref<IApiSymbol>()
    const infoRef = ref(info)
    const { width, height } = useElementSize(container)

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
      const res = infoRef.value
        ? await fetchKLine(
            infoRef.value?.symbol,
            Resolution[interval.value].server,
            size > 2000 ? 2000 : size
          )
        : null
      if (!Array.isArray(res)) {
        onResult(bars, { noData: true })
        return
      }
      for (let i = 0; i < res.length; i++) {
        const item = res[i]
        bars.push({
          time: item.id * 1000,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.vol
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
      const currentInfo = data || info.value
      widget.value = new window.TradingView.widget({
        symbol: currentInfo?.symbol,
        interval: interval.value as never,
        container: container.value!,
        autosize: true,
        datafeed: datafeed.value!,
        preset: width.value < 600 ? 'mobile' : undefined,
        library_path: '/charting_library/',
        theme: globalConfigStore.theme
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
