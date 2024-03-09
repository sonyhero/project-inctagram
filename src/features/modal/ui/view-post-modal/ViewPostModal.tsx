import React, { ChangeEvent, useState } from 'react'

import ImageNext from 'next/image'
import { useRouter } from 'next/router'

import s from './ViewPostModal.module.scss'

import { PostsResponseType, useGetPublicUserProfileByIdQuery } from '@/entities'
import { AvatarOwner } from '@/entities/avatar-owner'
import { useUpdatePostByIdMutation } from '@/entities/posts'
import { useMeQuery } from '@/features/auth'
import { modalActions } from '@/features/modal'
import { PATH } from '@/shared/config/routes'
import { usePostImagePagination, useTranslation } from '@/shared/hooks'
import { useAppDispatch } from '@/shared/store'
import {
  Bookmark,
  Button,
  Edit,
  Heart,
  Modal,
  MoreHorizontal,
  PaperPlane,
  PhotoPagination,
  TextAreaField,
  TextField,
  Trash,
  Typography,
} from '@/shared/ui'
import { DropDownMenu } from '@/shared/ui/drop-down-menu'
import { getDayMonthTime } from '@/shared/utils'

type Props = {
  open: boolean
  onClose: () => void
  postById: PostsResponseType
}

export const ViewPostModal = ({ open, onClose, postById }: Props) => {
  const { locale, push, query } = useRouter()
  const postId = Number(query.userId?.[1])
  const profileId = Number(query.userId?.[0])
  const { data: profileData } = useGetPublicUserProfileByIdQuery({ profileId })
  const [updatePost] = useUpdatePostByIdMutation()
  const { t } = useTranslation()

  const { data: meData } = useMeQuery()
  const isMe = meData ? meData.userId === profileId : false

  const dispatch = useAppDispatch()

  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState(postById?.description ?? '')

  const { filterImages, activeImage, prevImage, nextImage, activeIndex, setActiveIndex } =
    usePostImagePagination({ images: postById?.images })

  const isActivePhoto = postById?.images && postById?.images.length > 0 && activeImage

  const closeModal = () => {
    if (editMode) {
      setEditMode(false)
    } else {
      onClose()
      push(`${PATH.USER}/${profileId}`)
    }
  }

  const onChangeTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value)
  }

  const dropDownMenuSize = [
    {
      id: 1,
      component: (
        <div onClick={() => {}} className={s.itemActivity}>
          <Edit />
          <Typography variant={'regular14'} color={'primary'} onClick={() => setEditMode(true)}>
            {t.myProfile.profilePage.viewPost.editPost}
          </Typography>
        </div>
      ),
    },
    {
      id: 2,
      component: (
        <div
          onClick={() => {
            dispatch(modalActions.setOpenExtraModal('deletePostModal'))
          }}
          className={s.itemActivity}
        >
          <Trash />
          <Typography variant={'regular14'} color={'primary'}>
            {t.myProfile.profilePage.viewPost.deletePost}
          </Typography>
        </div>
      ),
    },
  ]
  const onSaveHandler = () => {
    if (postId) {
      updatePost({
        postId,
        description: value.length > 500 ? value.slice(0, 500) : value,
      })
        .unwrap()
        .then(() => {
          setEditMode(false)
        })
    }
  }

  return (
    <Modal
      className={s.modalBlock}
      showHeader={editMode}
      title={t.myProfile.profilePage.viewPost.editPost}
      open={open}
      onClose={closeModal}
      showCloseButton={editMode}
      contentBoxClassname={s.contentBox}
    >
      {isActivePhoto && (
        <div className={s.modalContent}>
          <div className={s.lastPhoto}>
            <ImageNext
              src={activeImage}
              alt={'post'}
              className={s.photo}
              width={500}
              height={500}
            />
            <PhotoPagination
              changePhotoNext={nextImage}
              changePhotoPrev={prevImage}
              photosArr={filterImages}
              changePhotoIndex={setActiveIndex}
              activeIndex={activeIndex}
            />
          </div>
          {!editMode ? (
            <div className={s.postDescriptionBlock}>
              <div className={s.topContent}>
                <div className={s.photoBlock}>
                  <AvatarOwner avatarOwner={profileData?.avatars?.[0]?.url} className={s.avatar} />
                  <Typography variant={'h3'}>{profileData?.userName}</Typography>
                </div>
                {isMe && (
                  <DropDownMenu
                    trigger={<MoreHorizontal />}
                    side={'bottom'}
                    items={dropDownMenuSize}
                    align={'end'}
                  />
                )}
              </div>
              <div className={s.middleContent}>
                <div className={s.comments}>
                  {postById?.description && (
                    <>
                      <AvatarOwner
                        avatarOwner={profileData?.avatars?.[0]?.url}
                        className={s.avatar}
                      />
                      <div className={s.descriptionBlock}>
                        <Typography variant={'regular14'} className={s.desc}>
                          <strong>{profileData?.userName}</strong> {postById.description}
                        </Typography>
                        <Typography variant={'small'} color={'secondary'}>
                          {getDayMonthTime(postById.createdAt, locale ?? 'en')}
                        </Typography>
                      </div>
                    </>
                  )}
                </div>

                <div className={s.bottomActivityBlock}>
                  <div className={s.likeSaveSetBlock}>
                    <div className={s.likeAndSet}>
                      <Heart />
                      <PaperPlane />
                    </div>
                    <Bookmark />
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
                  <Typography variant={'small'} color={'secondary'}>
                    {getDayMonthTime(postById.createdAt, locale ?? 'en')}
                  </Typography>
                </div>
              </div>
              <div className={s.bottomContent}>
                <TextField
                  style={{ border: 'none' }}
                  type={'default'}
                  className={s.addComment}
                  placeholder={t.myProfile.profilePage.viewPost.addAComment}
                />
                <Button variant={'text'}>{t.myProfile.profilePage.viewPost.publish}</Button>
              </div>
            </div>
          ) : (
            <div className={s.editBlock}>
              <div className={s.topContent}>
                <div className={s.photoBlock}>
                  <AvatarOwner avatarOwner={profileData?.avatars?.[0]?.url} className={s.avatar} />
                  <Typography variant={'h3'}>{profileData?.userName}</Typography>
                </div>
                <div>
                  <TextAreaField
                    label={t.myProfile.profilePage.viewPost.label}
                    placeholder={t.myProfile.profilePage.viewPost.placeholder}
                    value={value}
                    onChange={onChangeTextHandler}
                    disabled={value.length > 500}
                  />
                  <Typography variant={'small'} color={'secondary'} className={s.balance}>
                    {value.length}/500
                  </Typography>
                </div>
              </div>
              <div className={s.saveChangesBlock}>
                <Button variant={'primary'} onClick={onSaveHandler}>
                  {t.myProfile.profilePage.viewPost.saveChanges}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}
