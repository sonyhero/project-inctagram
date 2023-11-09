import React from 'react'

import s from './ErrorValidPhoto.module.scss'

import { Typography } from '@/shared/ui'

type Props = {
  error: string
}
export const ErrorValidPhoto = ({ error }: Props) => {
  return (
    <div className={s.error}>
      <Typography variant={'regular14'}>{error}</Typography>
    </div>
  )
}
