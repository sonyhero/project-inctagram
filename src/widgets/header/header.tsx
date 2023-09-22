import React from 'react'

import s from './header.module.scss'

import { Typography } from '@/shared/ui/typography'

export const Header = () => {
  return (
    <header className={s.header}>
      <Typography variant={'large'}>Inctargram</Typography>
    </header>
  )
}
