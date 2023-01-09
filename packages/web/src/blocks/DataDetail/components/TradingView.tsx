import { useElementSize } from '@vueuse/core'
import { storage } from '@wedex/utils'
import { defineComponent, ref, onMounted, computed } from 'vue'
import { DataFeed } from '../datafeed'
import { usePair } from '@/hooks'
import { services } from '@/services'
import { useGlobalConfigStore } from '@/stores'
import { Resolution } from '@/utils/trading'

export default defineComponent({
  name: 'TradingView',
  props: {
    pairId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const Pair = usePair()
    const globalConfigStore = useGlobalConfigStore()
    const interval = ref<keyof typeof Resolution>('5')
    const container = ref()
    const widget = ref<TradingView.IChartingLibraryWidget>()
    const datafeed = ref<DataFeed>()
    const { width } = useElementSize(container)

    const display_name = computed(
      () => `${Pair.current?.value?.tokenPair.map(e => e.symbol.toLocaleUpperCase()).join('/')}`
    )

    const initDatafeed = () => {
      const supported_resolutions = Object.keys(Resolution) as never
      datafeed.value = new DataFeed({
        SymbolInfo: {
          name: display_name.value,
          full_name: display_name.value,
          description: '',
          type: 'stock',
          session: '24x7',
          exchange: '',
          listed_exchange: '',
          timezone: 'Asia/Shanghai',
          format: 'price',
          pricescale: Math.pow(10, 6), //currentInfo['price-precision']
          minmov: 1,
          // volume_precision: currentInfo['value-precision'],
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
      if (!periodParams.firstDataRequest) {
        onResult(bars, { noData: true })
        return
      }
      if (resolution !== interval.value) {
        // unsubscribeKLine();
        interval.value = resolution as keyof typeof Resolution
      }
      const { error, data } = await services['Pair@get-kline-list']({
        pairId: props.pairId,
        type: Resolution[interval.value].name,
        size: Math.min(2000, width.value)
      })

      const res = !error ? data.list : null
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

    const initTradingView = () => {
      // remove local theme
      storage('local').remove('tradingview.current_theme.name')

      widget.value = new window.TradingView.widget({
        symbol: display_name.value,
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
      setTimeout(() => {
        initDatafeed()
        initTradingView()
      }, 100)
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
