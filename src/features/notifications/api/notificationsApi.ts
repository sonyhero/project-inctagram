import { GetNotificationsArgsType, GetNotificationsResponseType } from './notificationsApi.types'

import { baseApi } from '@/shared/api'

const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getNotifications: builder.query<GetNotificationsResponseType, GetNotificationsArgsType>({
        query: ({ cursor, ...params }) => ({
          url: `v1/notifications/${cursor}`,
          method: 'GET',
          params,
        }),
        providesTags: ['Notifications'],
      }),
      markNotificationAsRead: builder.mutation<any, { ids: number[] }>({
        query: body => ({
          url: `v1/notifications/mark-as-read`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: ['Notifications'],
      }),
      deleteNotification: builder.mutation<any, { id: string }>({
        query: ({ id }) => ({
          url: `v1/notifications/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Notifications'],
      }),
    }
  },
})

export const {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
} = notificationsApi
