import { storage } from '@wedex/utils'
import { ref, watch, computed } from 'vue'
import { services } from '@/services'
import { useUserStore } from '@/stores'

const store = ref<Record<string, any>>({})
const loading = ref(false)
const userStore = useUserStore()
const isLogged = computed(() => userStore.logged)

export function useCustomDataSync(functionKey: string) {
  // get list
  const fetchData = (callback?: () => void) => {
    if (!loading.value) {
      loading.value = true
      services['CustomFunction@get-custom-func-list']({
        function: functionKey,
        rankBy: 'index',
        rankType: 1
      })
        .then(res => {
          loading.value = false
          if (res && res.data) {
            store.value[functionKey] = res.data.list
            typeof callback === 'function' && callback()
          } else {
            console.warn('custom api errir', res)
          }
        })
        .catch(() => {
          loading.value = false
        })
    }
  }

  // create item
  const addData = (item: Record<string, any>) => {
    if (!loading.value) {
      loading.value = true
      services['CustomFunction@create-custom-func']({
        function: functionKey,
        item
      })
        .then(res => {
          loading.value = false
          if (res && res.data) {
            store.value[functionKey] = res.data.list
            // update list
            fetchData()
          } else {
            console.warn('custom api errir', res)
          }
        })
        .catch(() => {
          loading.value = false
        })
    }
  }

  // edit item
  const editData = (item: { id: string } & Record<string, any>) => {
    if (!loading.value) {
      loading.value = true
      services['CustomFunction@update-custom-func']({
        function: functionKey,
        id: item.id,
        item
      })
        .then(res => {
          if (res && res.data) {
            loading.value = false
            store.value[functionKey] = res.data.list
            // update list
            fetchData()
          } else {
            console.warn('custom api errir', res)
          }
        })
        .catch(() => {
          loading.value = false
        })
    }
  }

  // delete item
  const removeData = (id: string) => {
    if (!loading.value) {
      loading.value = true
      services['CustomFunction@delete-custom-func-item']({
        function: functionKey,
        id
      })
        .then(res => {
          loading.value = false
          if (res && res.data) {
            // update list
            fetchData()
          } else {
            console.warn('custom api errir', res)
          }
        })
        .catch(() => {
          loading.value = false
        })
    }
  }

  const addDataLocal = (item: Record<string, any>) => {
    if (Array.isArray(store.value[functionKey])) {
      store.value[functionKey].push({
        id: `locai_${Math.ceil(Math.random() * 1e8)}`,
        ...item
      })
      storage('local').set(functionKey, store.value[functionKey])
    }
  }

  const editDataLocal = (item: { id: string } & Record<string, any>) => {
    const targetIndex = Array.isArray(store.value[functionKey])
      ? store.value[functionKey].findIndex((e: any) => e.id === item.id)
      : -1
    if (targetIndex !== -1 && Array.isArray(store.value[functionKey])) {
      store.value[functionKey][targetIndex] = item
      storage('local').set(functionKey, store.value[functionKey])
    }
  }

  const removeDataLocal = (item: { id: string } & Record<string, any>) => {
    const targetIndex = Array.isArray(store.value[functionKey])
      ? store.value[functionKey].findIndex((e: any) => e.id === item.id)
      : -1
    if (targetIndex !== -1 && Array.isArray(store.value[functionKey])) {
      store.value[functionKey].splice(targetIndex, 1)
      storage('local').set(functionKey, store.value[functionKey])
    }
  }

  const syncCreateItems = (items: any[], callback?: () => void) => {
    if (!loading.value) {
      loading.value = true
      const updateTime = new Date().getTime()
      services['CustomFunction@sync-custom-func-items']({
        function: functionKey,
        list: items.map(e => {
          e.updateTime = updateTime
          return e
        })
      })
        .then(res => {
          loading.value = false
          if (res && res.data) {
            typeof callback === 'function' && callback()
            // update list
            fetchData()
          } else {
            console.warn('custom api addItems errir', res)
          }
        })
        .catch(() => {
          loading.value = false
        })
    }
  }

  const syncUpdateItms = (items: any[]) => {
    if (!loading.value) {
      loading.value = true
      services['CustomFunction@save-custom-func-items']({
        function: functionKey,
        list: items
      })
        .then(res => {
          loading.value = false
          if (res && res.data) {
            // update list
            fetchData()
          } else {
            console.warn('custom api addItems errir', res)
          }
        })
        .catch(() => {
          loading.value = false
        })
    }
  }

  // init
  watch(
    () => isLogged.value,
    value => {
      const localData = storage('local').get(functionKey) || []

      if (value) {
        if (Array.isArray(localData) && localData.length) {
          syncCreateItems(localData, () => {
            console.log('sycn to cloud success, clean local data')
            storage('local').remove(functionKey)
          })
        } else {
          fetchData()
        }
      } else {
        if (Array.isArray(localData)) {
          localData.sort((l, r) => (l.index > r.index ? 1 : -1))
          store.value[functionKey] = localData
        } else {
          console.log(`get local ${functionKey} data error: `, localData)
        }
      }
    },
    {
      immediate: true
    }
  )

  // methods
  return {
    loading,
    list: computed(() => store.value[functionKey]),
    add: (item: Record<string, any>) => {
      const updateTime = new Date().getTime()
      isLogged.value ? addData({ ...item, updateTime }) : addDataLocal({ ...item, updateTime })
    },
    update: (item: { id: string } & Record<string, any>) => {
      const updateTime = new Date().getTime()
      isLogged.value ? editData({ ...item, updateTime }) : editDataLocal({ ...item, updateTime })
    },
    remove: (item: { id: string } & Record<string, any>) => {
      if (item.id) {
        isLogged.value ? removeData(item.id) : removeDataLocal(item)
      } else {
        removeDataLocal(item)
      }
    },
    syncCreateItems,
    sortItms: (list: { index: number } & Record<string, any>[]) => {
      const updateTime = new Date().getTime()
      const sortList = list.map((e: any, index: number) => {
        e.index = index
        e.updateTime = updateTime
        return e
      })
      if (isLogged.value) {
        syncUpdateItms(sortList)
      } else {
        sortList.forEach(item => {
          editDataLocal({ ...item, updateTime })
        })
      }
    },
    findListByPiarid: (pairId?: string) => {
      return store.value[functionKey]?.filter(
        (item: any) => !!item.list?.find((e: any) => e.pairId === pairId)
      )
    }
  }
}
