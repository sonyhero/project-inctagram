import React from 'react'

import s from './header.module.scss'

import { Bell } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

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
