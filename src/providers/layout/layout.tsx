import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './layout.module.scss'

import { HeadMeta } from '@/shared/ui/head-meta'
import { SideBar } from '@/shared/ui/side-bar'
import { Header } from '@/widgets/header'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HeadMeta title={'NextJS Inctagram'} />
      <Header />
      <div className={s.container}>
        <SideBar />
        <main>{children}</main>
      </div>
    </>
  )
}

export const getBaseLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
