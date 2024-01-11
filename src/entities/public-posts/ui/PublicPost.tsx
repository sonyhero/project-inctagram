import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './PublicPost.module.scss'

import { PostsResponseType } from '@/entities'
import { AvatarOwner } from '@/entities/avatar-owner'
import { PATH } from '@/shared/config/routes'
import { Typography } from '@/shared/ui'
import { getDayMonthTime } from '@/shared/utils'
import imageIcon from 'public/imageIcon.svg'

type Props = PostsResponseType

export const PublicPost = (props: Props) => {
  const { images, avatarOwner, ownerId, createdAt } = props
  const { locale } = useRouter()

  return (
    <div className={s.post}>
      <div className={s.postHeader}>
        <div className={s.urlAndAvatar}>
          <AvatarOwner avatarOwner={avatarOwner} />
          <div className={s.textBlock}>
            <Link href={`${PATH.USER}/${ownerId}`} className={s.link}>
              <Typography variant={'h3'} color={'primary'}>
                URLProfile
              </Typography>
            </Link>
            <Typography className={s.marker}>&bull;</Typography>
            <Typography variant={'small'} color={'secondary'} className={s.date}>
              {getDayMonthTime(createdAt, locale ?? 'en')}
            </Typography>
          </div>
        </div>
      </div>
      <Image
        src={images[0]?.url ?? imageIcon}
        width={490}
        height={490}
        priority={true}
        alt={'post image'}
        // onClick={() => openPostModalHandler(el.id)}
      />
    </div>
  )
}
