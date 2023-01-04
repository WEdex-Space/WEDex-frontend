import { inject, Ref, watch, ref } from 'vue'
import { TradingDataItem } from '@/components/TradingDataList'
import { services } from '@/services'

const getDetail = async (pairId: string) => {
  const { error, data } = await services['Pair@get-pair-info']({
    pairId
  })
  if (!error) {
    return data
  }
  return Promise.reject()
}

export function usePair() {
  const currentPair = inject<Ref<TradingDataItem | undefined>>('currentPair')
  const detail = ref()

  watch(
    () => currentPair,
    () => {
      if (currentPair && currentPair.value) {
        getDetail(currentPair.value.id).then(data => (detail.value = data))
      } else {
        detail.value = undefined
      }
    },
    {
      deep: true,
      immediate: true
    }
  )

  return {
    current: currentPair,
    detail,
    setCurrent: (value: TradingDataItem) => {
      currentPair && (currentPair.value = value)
    },
    handleSocketData: (value: any) => {
      if (currentPair && currentPair.value && Array.isArray(currentPair.value.token) && value) {
        if (currentPair.value.token.map(e => e.symbol).join('/') === value.tradePair) {
          currentPair.value.originSocketValue = value
        }
      }
    }
  }
}
