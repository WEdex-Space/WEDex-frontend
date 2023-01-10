import { defineStore } from 'pinia'

const wsHost = import.meta.env.VITE_WEBSOCKET_URL
console.log('wsHost==', wsHost)

interface listenersType {
  [key: string]: ((p: any) => void)[]
}

export type SocketState = {
  SOCKET: any
  listeners: listenersType
}

export type SocketMsgType = {
  topic: string
  data: any
}

const initFuntions: (() => void)[] = []

export const useSocketStore = defineStore('websocket', {
  state: (): SocketState => ({
    SOCKET: null,
    listeners: {}
  }),
  actions: {
    init(flag?: any) {
      // clear listeners
      // this.listeners = {}

      // return the socket
      if (this.SOCKET && this.SOCKET.readyState === 1) {
        return new Promise(resolve => {
          resolve(this.SOCKET)
        })
      } else if ('WebSocket' in window) {
        // open a web socket
        return this.createNewSocket(flag)
      } else {
        return new Promise((resolve, reject) => {
          reject('Your browser does not support WebSocket')
        })
      }
    },
    createNewSocket(flag?: any) {
      flag && console.warn('flag', flag)
      // this.SOCKET && this.SOCKET.close()
      if (!this.SOCKET) {
        this.SOCKET = new WebSocket(`wss://${wsHost}/ws`)
        this.SOCKET.onmessage = (evt: any) => {
          try {
            const received_msg: SocketMsgType = JSON.parse(evt.data)
            // console.log(received_msg)
            if (received_msg.topic) {
              if (received_msg.topic === 'pong') {
                this.Heartbeat()
              } else {
                // try transform msg to json
                try {
                  received_msg.data = JSON.parse(received_msg.data)
                } catch (err) {
                  // console.log('received_msg：', received_msg)
                }

                // trigger liseners
                const listenersKey = Object.keys(this.listeners)
                listenersKey.forEach((key: string) => {
                  if (
                    key.split('__').length === 2 &&
                    key.split('__')[1] === received_msg.data.type
                  ) {
                    this.listeners[key].map(fun => fun(received_msg))
                  } else if (
                    key.split('__').length === 3 &&
                    key.split('__')[1] === received_msg.data?.type &&
                    key.split('__')[2] === received_msg.data?.value?.pairId
                  ) {
                    this.listeners[key].map(fun => fun(received_msg))
                  }
                })
              }
            }
          } catch (err) {
            console.warn(err, evt.data)
          }
        }

        this.SOCKET.onclose = () => {
          console.warn(`SOCKET is closed, try to reconnect after 30s`)
          setTimeout(this.createNewSocket, 30 * 1e3)
        }

        this.SOCKET.onerror = (error: Error) => {
          console.warn(`onerror | ${new Date().toLocaleTimeString()}`, error)
        }
      }

      return new Promise(resolve => {
        initFuntions.push(() => {
          resolve(this.SOCKET)
        })
        this.SOCKET.onopen = () => {
          initFuntions.map(func => func())
        }
      })
    },
    Heartbeat() {
      this.send({
        topic: 'ping'
      })
    },
    addLisener(
      key: string,
      callback?: (msg: SocketMsgType) => void,
      suffix?: string,
      namespace?: string
    ) {
      if (this.SOCKET) {
        if (key && typeof callback === 'function') {
          const finnalKey = `${namespace || 'main'}__${key}`
          if (suffix) {
            this.listeners[finnalKey + '__' + suffix] = [callback]
          } else {
            if (!Array.isArray(this.listeners[finnalKey])) {
              this.listeners[finnalKey] = []
            }
            this.listeners[finnalKey].push(callback)
          }
        }
        console.warn('addLisener:', key, suffix, JSON.stringify(this.listeners))
      } else {
        console.warn('The socket is not ready to receive messages', this.SOCKET.readyState)
      }
    },
    removeLisener(key: string, suffix?: string, namespace?: string) {
      if (key) {
        const finnalKey = `${namespace || 'main'}__${key}`
        if (suffix) {
          delete this.listeners[finnalKey + '__' + suffix]
        } else {
          delete this.listeners[finnalKey]
        }
        console.warn('removeLisener:', this.listeners)
      }
    },
    send(json: object | string) {
      if (this.SOCKET && this.SOCKET.readyState === 1) {
        try {
          if (json && typeof json === 'object') {
            this.SOCKET.send(JSON.stringify(json))
          } else {
            this.SOCKET.send(json)
          }
        } catch (err) {
          console.warn(err)
        }
      } else if (this.SOCKET) {
        console.warn('SOCKET is not ready', json)
      }
    },
    subscribe(
      type: string,
      value?: any,
      callback?: (msg: SocketMsgType) => void,
      namespace?: string
    ) {
      if (Array.isArray(value)) {
        value.map(val => {
          this.addLisener(type, callback, val, namespace)
        })
      } else {
        this.addLisener(type, callback, value, namespace)
      }

      this.send({
        topic: 'subscribe',
        data: {
          type,
          value
        }
      })
    },
    unsubscribe(type: string, value?: any, namespace?: string) {
      if (Array.isArray(value) && value.length) {
        value.map(val => {
          // if the data [type&val] is in using, then no need to unsubscribe
          const isInUse = Object.keys(this.listeners).find((key: string) => {
            return (
              key.split('__').length === 3 &&
              key.split('__')[0] !== (namespace || 'main') &&
              key.split('__')[1] === type &&
              key.split('__')[2] === val
            )
          })
          if (!isInUse) {
            this.send({
              topic: 'unsubscribe',
              data: {
                type,
                value
              }
            })
            this.removeLisener(type, val, namespace)
          }
        })
      } else {
        this.send({
          topic: 'unsubscribe',
          data: {
            type,
            value
          }
        })
        this.removeLisener(type, value, namespace)
      }
    }
  }
})
