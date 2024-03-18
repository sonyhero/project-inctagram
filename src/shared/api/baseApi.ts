import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { customFetchBase } from '@/shared/api/baseQueryWithReauth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: [
    'Me',
    'Profile',
    'Posts',
    'Subscriptions',
    'Sessions',
    'Followers',
    'Following',
    'User',
    'Notifications',
    'PostById',
  ],
  baseQuery: customFetchBase,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: () => ({}),
})
