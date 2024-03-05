import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './ViewPublicPostModal.module.scss'

import { AvatarOwner } from '@/entities/avatar-owner'
import { ImageType, PostsResponseType } from '@/entities/posts'
import { usePostImagePagination, useTranslation } from '@/shared/hooks'
import { Modal, PhotoPagination, Typography } from '@/shared/ui'
import { getDayMonthTime } from '@/shared/utils'

type Props = {
  open: boolean
  onClose: () => void
  postData: PostsResponseType
  avatars?: ImageType[]
}

export const ViewPublicPostModal = (props: Props) => {
  const { open, onClose, postData, avatars } = props
  const { t } = useTranslation()
  const { locale } = useRouter()

  const { filterImages, activeImage, prevImage, nextImage, activeIndex, setActiveIndex } =
    usePostImagePagination({ images: postData?.images })

  const iaActivePhoto = postData && postData.images.length > 0 && activeImage

  return (
    <Modal
      className={s.modalBlock}
      open={open}
      showHeader={false}
      onClose={onClose}
      contentBoxClassname={s.contentBox}
    >
      {iaActivePhoto && (
        <div className={s.modalContent}>
          <div className={s.lastPhoto}>
            <Image width={400} height={400} src={activeImage} alt={'post'} className={s.photo} />
            <PhotoPagination
              changePhotoNext={nextImage}
              changePhotoPrev={prevImage}
              photosArr={filterImages}
              changePhotoIndex={setActiveIndex}
              activeIndex={activeIndex}
            />
          </div>
          <div className={s.postDescriptionBlock}>
            <div className={s.topContent}>
              <div className={s.photoBlock}>
                <AvatarOwner avatarOwner={avatars?.[0]?.url} />
                <Typography className={s.link} onClick={onClose} variant={'h3'} color={'primary'}>
                  {postData.owner.firstName} {postData.owner.lastName}
                </Typography>
              </div>
            </div>
            <div className={s.middleContent}>
              <div className={s.comments}>
                {postData.description && (
                  <>
                    <AvatarOwner avatarOwner={avatars?.[0]?.url} />
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
