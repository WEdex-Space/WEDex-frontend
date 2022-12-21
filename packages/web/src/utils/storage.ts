import { storage } from '@WEDex/utils'

export default (key: string, value?: any) => {
  if (value) {
    return storage('local').set(key, value)
  } else {
    return storage('local').get(key)
  }
}
