import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './SettingsLayout.module.scss'

import { SettingsSwitcher } from '@/features/sattings-switcher/SettingsSwitcher'

const SettingsLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.profileBlock}>
      <SettingsSwitcher />
      {children}
    </div>
  )
}

export const getSettingsLayout = (page: ReactElement) => {
  return <SettingsLayout>{page}</SettingsLayout>
}
