import React from 'react'

import s from './header.module.scss'

import { Bell, Typography } from '@/shared/ui'

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <Typography variant={'large'}>Inctargram</Typography>
        <Bell />
      </div>
    </header>
  )
}
