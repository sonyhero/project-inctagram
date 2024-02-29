import { io, Socket } from 'socket.io-client'

import { SOCKET_URL } from '@/shared/config/constants'
import { Nullable } from '@/shared/types'

export class SocketAPI {
  static socket: Nullable<Socket> = null

  static createConnection(accessToken: string) {
    const queryParams = {
      query: {
        accessToken,
      },
    }

    this.socket = io(SOCKET_URL, queryParams)

    this.socket?.on('connect', () => {
      console.log('соединение')
    })

    this.socket?.on('disconnect', () => {
      console.log('соединение прервано')
    })
  }
}
