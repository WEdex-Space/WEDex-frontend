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

const pairIdCache = ref()

const detail = ref()

export function usePair() {
  const currentPair = inject<Ref<TradingDataItem | undefined>>('currentPair')

  watch(
    () => currentPair,
    () => {
      if (currentPair && currentPair.value) {
        if (pairIdCache.value !== currentPair.value.id) {
          pairIdCache.value = currentPair.value.id
          getDetail(currentPair.value.id).then(data => {
            detail.value = data
          })
        }
      } else {
        pairIdCache.value = undefined
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
    pairIdCache,
    detail,
    setCurrent: (value: TradingDataItem) => {
      currentPair && (currentPair.value = value)
    }
  }
}
