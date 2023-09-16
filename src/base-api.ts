import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from '@/base-query-with-reauth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Me'],
  baseQuery: customFetchBase,
  endpoints: () => ({}),
})
