import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './layout.module.scss'

import { HeadMeta } from '@/components/head-meta/head-meta'
import { Navbar } from '@/components/navbar/navbar'
import { Header } from '@/widgets/header'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HeadMeta title={'NextJS Inctagram'} />
      <Header />
      <div className={s.container}>
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  )
}

export const getBaseLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
