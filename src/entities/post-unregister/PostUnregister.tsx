import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import imageIcon from '/public/imageIcon.svg'

import s from './PostUnregister.module.scss'

import { AvatarOwner } from '@/entities/avatar-owner'
import { PostsResponseType } from '@/entities/posts'
import { PATH } from '@/shared/config/routes'
import { PhotoPagination, Typography } from '@/shared/ui'
import { getDayMonthTime } from '@/shared/utils'

type Props = PostsResponseType

export const PostUnregister = (props: Props) => {
  const { images, description, createdAt, avatarOwner, ownerId, id } = props
  const [activeIndex, setActiveIndex] = useState(0)
  const activePhoto = images[activeIndex]
  const { locale } = useRouter()

  const changePhoto = (direction: 'next' | 'prev') => {
    if (images && images.length > 0) {
      if (direction === 'next' && activeIndex < images.length / 2 - 1) {
        setActiveIndex(activeIndex + 1)
      } else if (direction === 'prev' && activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
      }
    }
  }

  return (
    <div className={s.postWrapper}>
      <div className={s.photoBlock}>
        <Link href={`${PATH.USER}/${ownerId}/${id}`}>
          <Image
            src={activePhoto?.url ?? imageIcon}
            priority={true}
            width={240}
            height={240}
            alt={'post picture'}
          />{' '}
        </Link>
        <PhotoPagination
          changePhotoNext={() => changePhoto('next')}
          changePhotoPrev={() => changePhoto('prev')}
          photosArr={images.slice(0, images.length / 2)}
          changePhotoIndex={setActiveIndex}
          activeIndex={activeIndex}
        />
      </div>
      <div className={s.urlAndAvatar}>
        <AvatarOwner avatarOwner={avatarOwner} />
        <Link href={`${PATH.USER}/${ownerId}`} className={s.link}>
          <Typography variant={'h3'} color={'primary'}>
            URL Profile
          </Typography>
        </Link>
      </div>
      <Typography variant={'small'} color={'secondary'}>
        {getDayMonthTime(createdAt, locale ?? 'en')}
      </Typography>
      <Typography variant={'regular14'} color={'primary'} className={s.description}>
        {description}
      </Typography>
    </div>
  )
}
