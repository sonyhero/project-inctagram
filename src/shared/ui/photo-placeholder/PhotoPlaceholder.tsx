import React from 'react'

import s from './PhotoPlaceholder.module.scss'

import { ImageIcon } from '@/shared/ui'

export const PhotoPlaceholder = () => {
  return (
    <div className={s.photoPlaceholder}>
      <ImageIcon height={48} width={48} />
    </div>
  )
}
