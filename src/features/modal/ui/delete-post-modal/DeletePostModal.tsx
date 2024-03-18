import React from 'react'

import { useRouter } from 'next/router'

import s from './DeletePostModal.module.scss'

import {
  useDeletePostByIdMutation,
  useDeletePostImageMutation,
  useGetPublicPostByIdQuery,
} from '@/entities/posts'
import { modalActions } from '@/features/modal'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { useAppDispatch } from '@/shared/store'
import { Modal, Typography } from '@/shared/ui'

type Props = {
  open: boolean
}

export const DeletePostModal = ({ open }: Props) => {
  const { t } = useTranslation()

  const { query, push } = useRouter()
  const profileId = Number(query.userId?.[0])
  const postId = Number(query.userId?.[1])

  const { data: post } = useGetPublicPostByIdQuery({ postId }, { skip: !postId })

  const dispatch = useAppDispatch()

  const [deletePostImages] = useDeletePostImageMutation()
  const [deletePost] = useDeletePostByIdMutation()

  const deletePostHandler = async () => {
    if (post?.images) {
      const images = post.images

      for (let i = 0; i < images.length; i++) {
        await deletePostImages({ uploadId: images[i].uploadId })
      }
    }
  }

  const deletePhotoHandler = () => {
    if (postId) {
      deletePost({ postId })
        .unwrap()
        .then(() => {
          deletePostHandler().then(() => {
            dispatch(modalActions.setCloseModal({}))
            dispatch(modalActions.setCloseExtraModal({}))
            push(`${PATH.USER}/${profileId}`)
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
