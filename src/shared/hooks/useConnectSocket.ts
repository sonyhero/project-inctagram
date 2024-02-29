import { useEffect } from 'react'

import { SocketAPI } from '@/shared/config/socketApi'

export const useConnectSocket = () => {
  const socketConnection = (accessToken: string) => {
    console.log('render1')

    SocketAPI.createConnection(accessToken)

    SocketAPI.socket?.on('notification', data => {
      console.log('notification', data)
    })

    console.log(SocketAPI.socket)
    console.log('render2')
  }

  useEffect(() => {
    const accessToken = typeof window !== 'undefined' && localStorage.getItem('access')

    console.log('accessToken', accessToken)
    if (accessToken) {
      socketConnection(accessToken)
    }
  }, [])
}
