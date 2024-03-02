import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NotificationType } from '@/features/notifications'
import { NotificationsDataType } from '@/features/notifications/model/notificationsSlice.types'

const initialState: NotificationsDataType = {
  notifications: [],
}

export const notificationsSlice = createSlice({
  name: 'notificationsSlice',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<NotificationType[]>) => {
      state.notifications = action.payload
    },
    setNewNotification: (state, action: PayloadAction<NotificationType>) => {
      state.notifications.push(action.payload)
    },
  },
})

export const notificationsActions = notificationsSlice.actions
