import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from '@/shared/api/baseQueryWithReauth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Me', 'Profile'],
  baseQuery: customFetchBase,
  endpoints: () => ({}),
})
