export type SupportSaveType = string | number | boolean | object | any[]

const scopeMap: {
  [key: string]: 'sessionStorage' | 'localStorage'
} = {
  session: 'sessionStorage',
  local: 'localStorage'
}

export function storage(type: 'session' | 'local') {
  const scope = window[scopeMap[type]]
  return {
    set<T extends SupportSaveType>(key: string, obj: T) {
      scope.setItem(key, JSON.stringify(obj))
    },
    get<T extends SupportSaveType>(key: string): T | undefined {
      const data = scope.getItem(key)
      if (!data) {
        return undefined
      }
      return JSON.parse(data) as T
    },
    remove(key: string) {
      scope.removeItem(key)
    },
    clear() {
      scope.clear()
    }
  }
}

// function key<T>(key: any, string: any) {
//   throw new Error('Function not implemented.')
// }
