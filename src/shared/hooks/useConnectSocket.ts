import { useEffect } from 'react'

import { SocketAPI } from '@/shared/config/socketApi'

export const useConnectSocket = () => {
  const socketConnection = (accessToken: string) => {
    SocketAPI.createConnection(accessToken)
    SocketAPI.socket?.on('notification', data => {
      console.log('notification', data)
    })
  }

  useEffect(() => {
    const accessToken = typeof window !== 'undefined' && localStorage.getItem('access')

    if (accessToken) {
      socketConnection(accessToken)
    }
  }, [])
}
