import React, { useState } from 'react'

import ImageNext from 'next/image'

import imageIcon from '/public/imageIcon.svg'

import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './ViewPublicPostModal.module.scss'

import { ImageType, PostsResponseType } from '@/entities/posts'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks'
import { Modal, PhotoPagination, Typography } from '@/shared/ui'
import { getDayMonthTime } from '@/shared/utils'

type Props = {
  open: boolean
  onClose: () => void
  postData: PostsResponseType
  avatars?: ImageType[]
}

export const ViewPublicPostModal = ({ open, onClose, postData, avatars }: Props) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const [activeIndex, setActiveIndex] = useState(0)
  const activePhoto = postData?.images[activeIndex]

  const changePhoto = (direction: 'next' | 'prev') => {
    if (postData?.images && postData?.images.length > 0) {
      if (direction === 'next' && activeIndex < postData?.images.length / 2 - 1) {
        setActiveIndex(activeIndex + 1)
      } else if (direction === 'prev' && activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
      }
    }
  }

  return (
    <Modal
      className={s.modalBlock}
      open={open}
      showHeader={false}
      onClose={onClose}
      contentBoxClassname={s.contentBox}
    >
      {postData?.images && postData?.images.length > 0 && activePhoto && (
        <div className={s.modalContent}>
          <div className={s.lastPhoto}>
            <img src={activePhoto.url} alt={'post'} className={s.photo} />
            <PhotoPagination
              changePhotoNext={() => changePhoto('next')}
              changePhotoPrev={() => changePhoto('prev')}
              photosArr={postData?.images.slice(0, postData.images.length / 2)}
              changePhotoIndex={setActiveIndex}
              activeIndex={activeIndex}
            />
          </div>
          <div className={s.postDescriptionBlock}>
            <div className={s.topContent}>
              <div className={s.photoBlock}>
                <ImageNext
                  src={avatars?.[0]?.url ?? imageIcon}
                  width={36}
                  height={36}
                  className={s.photoAva}
                  alt={'profilePhoto'}
                />
                <Link href={`${PATH.USER}/${postData.ownerId}`} className={s.link}>
                  <Typography variant={'h3'} color={'primary'}>
                    URL Profile
                  </Typography>
                </Link>
              </div>
            </div>
            <div className={s.middleContent}>
              <div className={s.comments}>
                {postData.description && (
                  <>
                    <ImageNext
                      width={36}
                      height={36}
                      src={avatars?.[0]?.url ?? imageIcon}
                      className={s.photoAva}
                      alt={'profilePhoto'}
                    />
                    <div className={s.descriptionBlock}>
                      <Typography variant={'regular14'} className={s.desc}>
                        <strong>
                          {postData?.owner.firstName} {postData?.owner.lastName}
                        </strong>{' '}
                        {postData.description}
                      </Typography>
                      <Typography variant={'small'} color={'secondary'}>
                        {getDayMonthTime(postData.createdAt, locale ?? 'en')}
                      </Typography>
                    </div>
                  </>
                )}
              </div>
              <div className={s.bottomBlock}>
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
                <Typography variant={'small'} color={'secondary'}>
                  {getDayMonthTime(postData.createdAt, locale ?? 'en')}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
