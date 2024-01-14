import React from 'react'

import Image from 'next/image'

import s from './AvatarOwner.module.scss'

import imageIcon from 'public/imageIcon.svg'

type Props = {
  avatarOwner?: string
  className?: string
}

export const AvatarOwner = ({ avatarOwner, className }: Props) => {
  return (
    <Image
      src={avatarOwner ?? imageIcon}
      width={36}
      height={36}
      alt={'avatar picture'}
      className={`${s.avatar} ${className}`}
    />
  )
}
