import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './SettingsLayout.module.scss'

import { SettingsSwitcher } from '@/features/sattings-switcher/SettingsSwitcher'
import { StoreProvider } from '@/shared/providers/store-provider/StoreProvider'
import { HeadMeta } from '@/shared/ui/head-meta'
import { Header } from '@/widgets/header'
import { SideBar } from '@/widgets/side-bar'

export const SettingsLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HeadMeta title={'Inctagram'} />
      <Header />
      <div className={s.container}>
        <SideBar />
        <main className={s.main}>
          <div className={s.profileBlock}>
            <SettingsSwitcher />
            {children}
          </div>
        </main>
      </div>
    </>
  )
}

export const getSettingsLayout = (page: ReactElement) => {
  return (
    <StoreProvider>
      <SettingsLayout>{page}</SettingsLayout>
    </StoreProvider>
  )
}
