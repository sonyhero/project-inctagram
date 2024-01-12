import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import s from './PublicPost.module.scss'

import { PostsResponseType } from '@/entities'
import { AvatarOwner } from '@/entities/avatar-owner'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks'
import {
  Bookmark,
  Copy,
  Heart,
  MessageCircle,
  MoreHorizontal,
  PaperPlane,
  PersonAdd,
  PersonRemove,
  PhotoPagination,
  Typography,
} from '@/shared/ui'
import { DropDownMenu } from '@/shared/ui/drop-down-menu'
import { getDayMonthTime } from '@/shared/utils'
import imageIcon from 'public/imageIcon.svg'

type Props = PostsResponseType

export const PublicPost = (props: Props) => {
  const { images: postImages, avatarOwner, ownerId, createdAt, id, description, owner } = props
  const { locale } = useRouter()
  const { t } = useTranslation()

  const [activeIndex, setActiveIndex] = useState(0)

  const images = postImages.filter(img => img.width === 1440)

  const activePhoto = images[activeIndex]

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Ссылка на пост скопирована')
      })
      .catch(() => {
        toast.error('Не удалось скопировать ссылку на пост')
      })
  }

  const copyHandler = () =>
    copyToClipboard(`${process.env.NEXT_PUBLIC_BASE_URL}${PATH.USER}/${ownerId}/${id}`)

  const changePhoto = (direction: 'next' | 'prev') => {
    if (images && images.length > 0) {
      if (direction === 'next' && activeIndex < images.length - 1) {
        setActiveIndex(activeIndex + 1)
      } else if (direction === 'prev' && activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
      }
    }
  }

  const dropDownMenuSize = [
    {
      id: 1,
      component: (
        <div className={s.itemActivity}>
          <PersonAdd />
          <PersonRemove />
          <Typography variant={'regular14'} color={'primary'}>
            Follow/Unfollow
          </Typography>
        </div>
      ),
    },
    {
      id: 2,
      component: (
        <div className={s.itemActivity}>
          <Copy />
          <Typography onClick={copyHandler} variant={'regular14'} color={'primary'}>
            Copy Link
          </Typography>
        </div>
      ),
    },
  ]

  return (
    <div className={s.post}>
      <div className={s.postHeader}>
        <div className={s.textBlock}>
          <AvatarOwner avatarOwner={avatarOwner} className={s.avatar} />
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
        <DropDownMenu
          trigger={<MoreHorizontal />}
          side={'bottom'}
          items={dropDownMenuSize}
          align={'end'}
        />
      </div>
      <div className={s.imageContent}>
        <Image
          src={activePhoto.url ?? imageIcon}
          width={490}
          height={490}
          priority={true}
          alt={'post image'}
          className={s.photo}
        />
        <PhotoPagination
          changePhotoNext={() => changePhoto('next')}
          changePhotoPrev={() => changePhoto('prev')}
          photosArr={images}
          changePhotoIndex={setActiveIndex}
          activeIndex={activeIndex}
        />
      </div>

      <div className={s.postFooter}>
        <div className={s.likeSaveSetBlock}>
          <div className={s.likeAndSet}>
            <Heart />
            <MessageCircle />
            <PaperPlane />
          </div>
          <Bookmark />
        </div>
        <div className={s.comments}>
          {description && (
            <>
              <AvatarOwner avatarOwner={avatarOwner} />

              <Typography variant={'regular14'} className={s.description}>
                <strong>
                  {owner.firstName} {owner.lastName}
                </strong>{' '}
                {description}
              </Typography>
            </>
          )}
        </div>
        <div className={s.viewsAndCount}>
          <div className={s.views}>
            {[0, 1, 2].map(el => {
              return <div key={el} className={s.view}></div>
            })}
          </div>
          <div className={s.count}>
            <Typography variant={'regular14'} color={'primary'}>
              0
            </Typography>
            <Typography variant={'bold14'} color={'primary'}>
              &quot;{t.myProfile.profilePage.viewPost.like}&quot;
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
