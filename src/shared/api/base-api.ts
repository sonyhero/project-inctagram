import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from '@/shared/api/base-query-with-reauth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Me', 'Profile'],
  baseQuery: customFetchBase,
  endpoints: () => ({}),
})
