import React, { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './PostUnregister.module.scss'

import { PostsResponseTypeImages } from '@/entities/posts'
import { PhotoPagination, Typography } from '@/shared/ui'
import { getDayMonthTime } from '@/shared/utils'

type Props = {
  photos: PostsResponseTypeImages[]
  desc: string
  createdAt: string
}

export const PostUnregister = ({ photos, desc, createdAt }: Props) => {
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
    <div>
      <div className={s.photoBlock}>
        <Image src={activePhoto.url} width={240} height={240} alt={'post picture'} />
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
          src={photos[0].url}
          width={36}
          height={36}
          alt={'post picture'}
          className={s.avatar}
        />
        <Typography variant={'h3'} color={'primary'}>
          URL Profile
        </Typography>
      </div>
      <Typography variant={'small'} color={'secondary'}>
        {getDayMonthTime(createdAt, locale ?? 'en')}
      </Typography>
      <Typography variant={'regular14'} color={'primary'}>
        {desc}
      </Typography>
    </div>
  )
}
