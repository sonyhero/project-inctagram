import React from 'react'

import { clsx } from 'clsx'
import Image from 'next/image'

import s from './AvatarOwner.module.scss'

import imageIcon from 'public/imageIcon.svg'

type Props = {
  avatarOwner?: string
  className?: string
  height?: number
  width?: number
}

export const AvatarOwner = (props: Props) => {
  const { avatarOwner, className, height = 36, width = 36 } = props

  const cN = clsx(s.avatar, {
    className,
  })

  return (
    <Image
      alt={'avatar picture'}
      className={cN}
      width={width}
      height={height}
      src={avatarOwner ?? imageIcon}
    />
  )
}
