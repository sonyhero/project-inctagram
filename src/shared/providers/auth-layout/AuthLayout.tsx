import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './AuthLayout.module.scss'

import { HeadMeta } from '@/shared/ui/head-meta'
import { Header } from '@/widgets/header'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HeadMeta title={'Inctagram'} />
      <Header />
      <main className={s.container}>{children}</main>
    </>
  )
}

export const getAuthLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}
