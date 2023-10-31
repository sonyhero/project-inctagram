import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './Layout.module.scss'

import { StoreProvider } from '@/shared/providers/store-provider/StoreProvider'
import { HeadMeta } from '@/shared/ui/head-meta'
import { Header } from '@/widgets/header'
import { SideBar } from '@/widgets/side-bar'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HeadMeta title={'Inctagram'} />
      <Header />
      <div className={s.container}>
        <SideBar />
        <main className={s.main}>{children}</main>
      </div>
    </>
  )
}

export const getBaseLayout = (page: ReactElement) => {
  return (
    <StoreProvider>
      <Layout>{page}</Layout>
    </StoreProvider>
  )
}
