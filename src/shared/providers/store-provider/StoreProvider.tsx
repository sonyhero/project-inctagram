import { PropsWithChildren } from 'react'

import { NextPage } from 'next'
import { Provider } from 'react-redux'

import { store } from '@/shared/store/store'

export const StoreProvider: NextPage<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
