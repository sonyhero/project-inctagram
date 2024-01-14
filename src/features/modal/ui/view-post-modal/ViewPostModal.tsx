import React, { ChangeEvent, useState } from 'react'

import ImageNext from 'next/image'
import { useRouter } from 'next/router'

import s from './ViewPostModal.module.scss'

import { Avatar } from '@/entities'
import { postsActions, useUpdatePostByIdMutation } from '@/entities/posts'
import { useGetProfileQuery } from '@/entities/profile'
import { modalActions } from '@/features/modal'
import { usePostImagePagination, useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
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
}

export const ViewPostModal = ({ open }: Props) => {
  const { data } = useGetProfileQuery()
  const [updatePost] = useUpdatePostByIdMutation()
  const { t } = useTranslation()
  const { locale } = useRouter()
  const dispatch = useAppDispatch()
  const post = useAppSelector(state => state.postsSlice.post)
  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState(post?.description ?? '')

  const { filterImages, activeImage, prevImage, nextImage, activeIndex, setActiveIndex } =
    usePostImagePagination({ images: post?.images })

  const iaActivePhoto = post?.images && post?.images.length > 0 && activeImage

  const closeModal = () => {
    if (editMode) {
      setEditMode(false)
    } else {
      setTimeout(() => {
        dispatch(modalActions.setCloseModal({}))
      }, 0)
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
    if (post?.id) {
      updatePost({
        postId: post?.id,
        description: value.length > 500 ? value.slice(0, 500) : value,
      })
        .unwrap()
        .then(() => {
          dispatch(
            postsActions.updatePost({
              description: value.length > 500 ? value.slice(0, 500) : value,
            })
          )
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
      {iaActivePhoto && (
        <div className={s.modalContent}>
          <div className={s.lastPhoto}>
            <ImageNext
              src={activeImage}
              alt={'post'}
              className={s.photo}
              width={400}
              height={400}
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
                  <Avatar className={s.photoAva} />
                  <Typography variant={'h3'}>{data?.userName}</Typography>
                </div>
                <DropDownMenu
                  trigger={<MoreHorizontal />}
                  side={'bottom'}
                  items={dropDownMenuSize}
                  align={'end'}
                />
              </div>
              <div className={s.middleContent}>
                <div className={s.comments}>
                  {post?.description && (
                    <>
                      <Avatar className={s.photoAva} />
                      <div className={s.descriptionBlock}>
                        <Typography variant={'regular14'} className={s.desc}>
                          <strong>{data?.userName}</strong> {post.description}
                        </Typography>
                        <Typography variant={'small'} color={'secondary'}>
                          {getDayMonthTime(post.createdAt, locale ?? 'en')}
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
                    {getDayMonthTime(post.createdAt, locale ?? 'en')}
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
                  <Avatar className={s.photoAva} />
                  <Typography variant={'h3'}>{data?.userName}</Typography>
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
