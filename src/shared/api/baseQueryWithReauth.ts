import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import NProgress from 'nprogress'
import { toast } from 'react-toastify'

const baseUrl = 'https://inctagram.work/api'
const isClient = typeof window !== 'undefined'

// Create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl,
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

    if (result.error?.status === 'FETCH_ERROR') {
      const locale = isClient && localStorage.getItem('locale')

      locale === 'en' ? toast.error('Network Error') : toast.error('Ошибка соединения с сервером')
    }

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
