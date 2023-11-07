import React from 'react'

import s from './DeletePostModal.module.scss'

import { postsActions, useDeletePostByIdMutation } from '@/entities/posts'
import { modalActions } from '@/features/modal'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Modal, Typography } from '@/shared/ui'

type Props = {
  open: boolean
}

export const DeletePostModal = ({ open }: Props) => {
  const [deletePhoto] = useDeletePostByIdMutation()
  const postId = useAppSelector(state => state.postsSlice.post?.id)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const deletePhotoHandler = () => {
    if (postId) {
      deletePhoto({ postId })
        .unwrap()
        .then(() => {
          dispatch(postsActions.deletePost({ postId }))
          dispatch(postsActions.setPost(null))
          dispatch(modalActions.setCloseModal({}))
          dispatch(modalActions.setCloseExtraModal({}))
        })
    }
  }
  const closeDeleteModal = () => {
    dispatch(modalActions.setCloseExtraModal({}))
  }

  return (
    <Modal
      className={s.modalBlock}
      title={'Delete Post'}
      open={open}
      titleFirstButton={'YES'}
      titleSecondButton={'NO'}
      onClose={closeDeleteModal}
      buttonBlockClassName={s.buttonBlock}
      callBack={deletePhotoHandler}
    >
      <div className={s.modalContent}>
        <Typography variant={'regular16'} className={s.description}>
          Are you sure you want to delete this post?
        </Typography>
      </div>
    </Modal>
  )
}
