import { SessionsTypeResponse } from '@/entities/session/api/sessionApi.types'
import { baseApi } from '@/shared/api'

const sessionApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getSessions: builder.query<SessionsTypeResponse, void>({
        query: () => ({
          url: `v1/sessions`,
          method: 'GET',
        }),
        providesTags: ['Sessions'],
      }),
      terminateAllSessions: builder.mutation<void, void>({
        query: () => ({
          url: `v1/sessions/terminate-all`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Sessions'],
      }),
      terminateSession: builder.mutation<void, number>({
        query: body => ({
          url: `v1/sessions/${body}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Sessions'],
      }),
    }
  },
})

export const { useGetSessionsQuery, useTerminateAllSessionsMutation, useTerminateSessionMutation } =
  sessionApi
