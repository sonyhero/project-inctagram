import React from 'react'

import s from './DeletePostModal.module.scss'

import {
  postsActions,
  useDeletePostByIdMutation,
  useDeletePostImageMutation,
} from '@/entities/posts'
import { modalActions } from '@/features/modal'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Modal, Typography } from '@/shared/ui'

type Props = {
  open: boolean
}

export const DeletePostModal = ({ open }: Props) => {
  const { t } = useTranslation()

  const postId = useAppSelector(state => state.postsSlice.post?.id)
  const images = useAppSelector(state => state.postsSlice.post?.images)
  const publicationCount = useAppSelector(state => state.postsSlice.publicationCount)
  const dispatch = useAppDispatch()

  const [deletePostImages] = useDeletePostImageMutation()
  const [deletePost] = useDeletePostByIdMutation()

  const deletePostHandler = async () => {
    if (images) {
      if (images) {
        for (let i = 0; i < images.length; i++) {
          await deletePostImages({ uploadId: images[i].uploadId })
        }
      }
    }
  }

  const deletePhotoHandler = () => {
    if (postId) {
      deletePostHandler().then(() => {
        deletePost({ postId })
          .unwrap()
          .then(() => {
            dispatch(postsActions.deletePost({ postId }))
            dispatch(postsActions.updatePublicationCount(publicationCount - 1))
            dispatch(postsActions.setPost(null))
            dispatch(modalActions.setCloseModal({}))
            dispatch(modalActions.setCloseExtraModal({}))
          })
      })
    }
  }

  const closeDeleteModal = () => {
    dispatch(modalActions.setCloseExtraModal({}))
  }

  return (
    <Modal
      className={s.modalBlock}
      title={t.myProfile.profilePage.viewPost.deletePost}
      open={open}
      titleFirstButton={t.myProfile.profilePage.viewPost.yes}
      titleSecondButton={t.myProfile.profilePage.viewPost.no}
      onClose={closeDeleteModal}
      buttonBlockClassName={s.buttonBlock}
      callBack={deletePhotoHandler}
    >
      <div className={s.modalContent}>
        <Typography variant={'regular16'} className={s.description}>
          {t.myProfile.profilePage.viewPost.areYouSure}
        </Typography>
      </div>
    </Modal>
  )
}
