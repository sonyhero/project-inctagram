import type { ReactElement, ReactNode } from 'react'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@/shared/styles/index.scss'
import '../shared/ui/toast/toast.css'

import { StoreProvider } from '@/providers/store-provider/store-provider'
import { ToastNotify } from '@/shared/ui/toast/toast'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <StoreProvider>
      <ToastNotify />
      <Component {...pageProps} />
    </StoreProvider>
  )
}
