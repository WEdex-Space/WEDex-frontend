import { ref } from 'vue'
import { services } from '@/services'

const list = ref<string[]>([])

const loading = ref(false)

export function useCategory(refresh = false) {
  const getList = async (reload = refresh) => {
    if ((reload || !list.value.length) && !loading.value) {
      loading.value = true
      const { error, data } = await services['Token@get-token-categories-list']()
      if (!error) {
        list.value = data?.list || []
      } else {
        list.value = []
      }
      loading.value = false
    }
  }

  getList()

  return {
    list,
    reload: () => getList(true)
  }
}
