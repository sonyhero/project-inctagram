import { useEffect } from 'react'

import { notificationsActions, NotificationType } from '@/features/notifications'
import { SocketAPI } from '@/shared/config/socketApi'
import { useAppDispatch } from '@/shared/store'

export const useConnectSocket = () => {
  const dispatch = useAppDispatch()
  const socketConnection = (accessToken: string) => {
    SocketAPI.createConnection(accessToken)
    SocketAPI.socket?.on('notifications', data => {
      // console.log('notification', data)
      const newNotification: NotificationType = {
        id: data.id,
        isRead: data.isRead,
        message: data.message,
        notifyAt: data.notifyAt,
      }

      dispatch(notificationsActions.setNewNotification(newNotification))
    })
  }

  useEffect(() => {
    const accessToken = typeof window !== 'undefined' && localStorage.getItem('access')

    if (accessToken) {
      socketConnection(accessToken)
    }
  }, [])
}
