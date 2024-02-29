import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import NProgress from 'nprogress'
import { toast } from 'react-toastify'

import { BASE_URL } from '@/shared/config/constants'

const isClient = typeof window !== 'undefined'

// Create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    const access = isClient && localStorage.getItem('access')

    if (access) {
      headers.set('Authorization', `Bearer ${access}`)
    }

    return headers
  },
})

export const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  try {
    isClient && NProgress.start()
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    const status = result.error?.status

    if (isClient) {
      const locale = localStorage.getItem('locale')

      switch (status) {
        case 400:
          locale === 'en' ? toast.error('Error 400') : toast.error('Ошибка 400')
          break
        case 500:
          locale === 'en' ? toast.error('Error 500') : toast.error('Ошибка 500')
          break
        case 'FETCH_ERROR':
          locale === 'en'
            ? toast.error('Network Error')
            : toast.error('Ошибка соединения с сервером')
      }
    }

    // if (result.error?.status === 'FETCH_ERROR') {
    //   const locale = isClient && localStorage.getItem('locale')
    //
    //   locale === 'en' ? toast.error('Network Error') : toast.error('Ошибка соединения с сервером')
    // }

    if (result.error?.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()

        try {
          if (localStorage.getItem('access')) {
            const refreshResult = await baseQuery(
              { url: 'v1/auth/update-tokens', method: 'POST' },
              api,
              extraOptions
            )

            if (refreshResult?.meta?.response?.status === 200) {
              // @ts-ignore
              localStorage.setItem('access', refreshResult?.data?.accessToken)
              // Retry the initial query
              result = await baseQuery(args, api, extraOptions)
            }
          }
        } finally {
          release()
        }
      } else {
        await mutex.waitForUnlock()
        result = await baseQuery(args, api, extraOptions)
      }
    }

    return result
  } finally {
    isClient && NProgress.done()
  }
  // wait until the mutex is available without locking it
}
