import React from 'react'

import Image from 'next/image'

import { useGetProfileQuery } from '@/entities/profile'
import imageIcon from 'public/imageIcon.svg'
import loader from 'public/loader.svg'

type Props = {
  userId: number
  className: string
  width?: number
  height?: number
}

export const Avatar = (props: Props) => {
  const { userId, className, width = 192, height = 192 } = props
  const { data: profileData, isFetching, isLoading } = useGetProfileQuery(userId)
  const isLoadingAvatar = isLoading && isFetching
  const avatar = profileData?.avatars.length && profileData.avatars[0].url
  const profilePhoto = isLoadingAvatar ? loader : avatar ?? imageIcon

  return (
    <Image
      src={profilePhoto}
      priority={true}
      width={width}
      height={height}
      className={className}
      alt={'profilePhoto'}
    />
  )
}
