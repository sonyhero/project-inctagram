import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import imageIcon from '/public/imageIcon.svg'

import s from './PostUnregister.module.scss'

import { PostsResponseTypeImages } from '@/entities/posts'
import { PATH } from '@/shared/config/routes'
import { PhotoPagination, Typography } from '@/shared/ui'
import { getDayMonthTime } from '@/shared/utils'

type Props = {
  photos: PostsResponseTypeImages[]
  desc: string
  createdAt: string
  avatarOwner: string
  userId: number
  postId: number
}

export const PostUnregister = (props: Props) => {
  const { photos, desc, createdAt, avatarOwner, userId, postId } = props
  const [activeIndex, setActiveIndex] = useState(0)
  const activePhoto = photos[activeIndex]
  const { locale } = useRouter()

  const changePhoto = (direction: 'next' | 'prev') => {
    if (photos && photos.length > 0) {
      if (direction === 'next' && activeIndex < photos.length / 2 - 1) {
        setActiveIndex(activeIndex + 1)
      } else if (direction === 'prev' && activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
      }
    }
  }

  return (
    <div className={s.postWrapper}>
      <div className={s.photoBlock}>
        <Link href={`${PATH.USER}/${userId}/${postId}`}>
          <Image
            src={activePhoto?.url ?? imageIcon}
            width={240}
            height={240}
            alt={'post picture'}
          />{' '}
        </Link>
        <PhotoPagination
          changePhotoNext={() => changePhoto('next')}
          changePhotoPrev={() => changePhoto('prev')}
          photosArr={photos.slice(0, photos.length / 2)}
          changePhotoIndex={setActiveIndex}
          activeIndex={activeIndex}
        />
      </div>
      <div className={s.urlAndAvatar}>
        <Image
          src={avatarOwner ?? imageIcon}
          width={36}
          height={36}
          alt={'post picture'}
          className={s.avatar}
        />
        <Link href={`${PATH.USER}/${userId}`} className={s.link}>
          <Typography variant={'h3'} color={'primary'}>
            URL Profile
          </Typography>
        </Link>
      </div>
      <Typography variant={'small'} color={'secondary'}>
        {getDayMonthTime(createdAt, locale ?? 'en')}
      </Typography>
      <Typography variant={'regular14'} color={'primary'} className={s.description}>
        {desc}
      </Typography>
    </div>
  )
}
