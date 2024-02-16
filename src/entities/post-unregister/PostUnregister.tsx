import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './PostUnregister.module.scss'

import { AvatarOwner } from '@/entities/avatar-owner'
import { PostsResponseType } from '@/entities/posts'
import { PATH } from '@/shared/config/routes'
import { usePostImagePagination } from '@/shared/hooks'
import { PhotoPagination, Typography } from '@/shared/ui'
import { getDayMonthTime } from '@/shared/utils'

type Props = PostsResponseType

export const PostUnregister = (props: Props) => {
  const { images, description, createdAt, avatarOwner, ownerId, id, owner } = props
  const { locale } = useRouter()
  const [showMore, setShowMore] = useState<boolean>(false)

  const { filterImages, activeImage, prevImage, nextImage, activeIndex, setActiveIndex } =
    usePostImagePagination({ images })

  const collapseHandler = () => {
    setShowMore(!showMore)
  }

  return (
    <div className={s.postWrapper}>
      <div className={`${s.photoBlock} ${showMore && s.collapsePhotoBlock}`}>
        <Link href={`${PATH.USER}/${ownerId}/${id}`}>
          <Image
            className={`${s.postImage} ${showMore && s.collapsePostImage}`}
            src={activeImage}
            priority={true}
            width={240}
            height={240}
            alt={'post picture'}
          />{' '}
        </Link>
        <PhotoPagination
          changePhotoNext={nextImage}
          changePhotoPrev={prevImage}
          photosArr={filterImages}
          changePhotoIndex={setActiveIndex}
          activeIndex={activeIndex}
        />
      </div>
      <div className={s.urlAndAvatar}>
        <AvatarOwner avatarOwner={avatarOwner} />
        <Link href={`${PATH.USER}/${ownerId}`} className={s.link}>
          <Typography variant={'h3'} color={'primary'}>
            {owner.firstName} {owner.lastName}
          </Typography>
        </Link>
      </div>
      <Typography variant={'small'} color={'secondary'}>
        {getDayMonthTime(createdAt, locale ?? 'en')}
      </Typography>
      <Typography variant={'regular14'} color={'primary'}>
        {showMore ? description : `${description.substring(0, 90)}`}
      </Typography>
      {description.length > 90 && (
        <Typography variant={'link'} onClick={collapseHandler}>
          {' '}
          ...{showMore ? 'Hide' : 'Show more'}
        </Typography>
      )}
    </div>
  )
}
