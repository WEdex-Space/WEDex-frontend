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

export const useSocketStore = defineStore('websocket', {
  state: (): SocketState => ({
    SOCKET: null,
    listeners: {}
  }),
  actions: {
    init() {
      // clear listeners
      this.listeners = {}

      // return the socket
      if (this.SOCKET) {
        return new Promise(resolve => {
          resolve(this.SOCKET)
        })
      }

      if ('WebSocket' in window) {
        // open a web socket
        return this.createNewSocket()
      } else {
        return new Promise((resolve, reject) => {
          reject('Your browser does not support WebSocket')
        })
      }
    },
    createNewSocket() {
      const isReLink = !!this.SOCKET
      // this.SOCKET && this.SOCKET.close()
      return new Promise(resolve => {
        // craete socket connect
        this.SOCKET = new WebSocket(`wss://${wsHost}/ws`)

        this.SOCKET.onopen = () => {
          resolve(this.SOCKET)
          if (isReLink) {
            console.log('SOCKET_RELINK')
          }
        }

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
                  console.log('received_msg：', received_msg)
                }

                // trigger liseners
                const listenersKey = Object.keys(this.listeners)
                listenersKey.forEach((key: string) => {
                  if (key === received_msg.topic) {
                    this.listeners[key].map(fun => fun(received_msg))
                  } else if (
                    key.split('__').length === 2 &&
                    key.split('__')[0] === received_msg.topic &&
                    key.split('__')[1] === `${received_msg.data.type}-${received_msg.data.value}`
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
      })
    },
    Heartbeat() {
      this.send({
        topic: 'ping'
      })
    },
    addLisener(key: string, callback: (msg: SocketMsgType) => void, suffix?: string) {
      if (this.SOCKET) {
        if (key && typeof callback === 'function') {
          if (suffix) {
            this.listeners[key + '__' + suffix] = [callback]
          } else {
            if (!Array.isArray(this.listeners[key])) {
              this.listeners[key] = []
            }
            this.listeners[key].push(callback)
          }
        }
        console.warn('addLisener:', this.listeners)
      } else {
        console.warn('The socket is not ready to receive messages', this.SOCKET.readyState)
      }
    },
    removeLisener(key: string, suffix?: string) {
      if (key) {
        if (suffix) {
          delete this.listeners[key + '__' + suffix]
        } else {
          delete this.listeners[key]
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
        console.warn('SOCKET is not ready', this.SOCKET.readyState)
      }
    },
    subscribe(
      type: string,
      value: any,
      callback: (msg: SocketMsgType) => void,
      target_id?: number
    ) {
      this.addLisener('subscribe', callback, `${type}-${value}`)

      this.send({
        topic: 'subscribe',
        data: {
          type,
          value,
          target_id
        }
      })
    },
    unsubscribe(type: string, value: any, target_id?: number) {
      this.send({
        topic: 'unsubscribe',
        data: {
          type,
          value,
          target_id
        }
      })

      this.removeLisener('subscribe', `${type}-${value}`)
    }
  }
})
