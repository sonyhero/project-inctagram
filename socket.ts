import { Socket, io } from 'socket.io-client'

import { Nullable } from '@/shared/types'

export class SocketAPI {
  static socket: Nullable<Socket> = null

  static createConnection(accessToken: string) {
    const queryParams = {
      query: {
        accessToken,
      },
    }

    this.socket = io('https://inctagram.work/notifications', queryParams)

    this.socket.on('connect', () => {
      console.log('соединенние')
    })

    this.socket.on('disconnect', () => {
      console.log('соединенние прервано')
    })
  }
}
