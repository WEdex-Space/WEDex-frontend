import { inject, Ref } from 'vue'
import { TradingDataItem } from '@/components/TradingDataList'

export function usePair() {
  const currentDetail = inject<Ref<TradingDataItem | undefined>>('currentDetail')

  return {
    current: currentDetail,
    setCurrent: (value: TradingDataItem) => {
      currentDetail && (currentDetail.value = value)
    }
  }
}
