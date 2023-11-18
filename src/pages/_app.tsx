import type { ReactElement, ReactNode } from 'react'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { NextPage } from 'next'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@/shared/styles/index.scss'
import '../shared/ui/toast/ToastNotify.css'
import 'nprogress/nprogress.css'
import '../shared/ui/date-picker/DatePicker.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { useLoader } from '@/shared/hooks'
import { wrapper } from '@/shared/store'
import { ToastNotify } from '@/shared/ui'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, ...pageProps }: AppPropsWithLayout) {
  useLoader()
  const { store, props } = wrapper.useWrappedStore(pageProps)
  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
      <Provider store={store}>
        <ToastNotify />
        <Component {...props.pageProps} />
      </Provider>
    </GoogleOAuthProvider>
  )
}
