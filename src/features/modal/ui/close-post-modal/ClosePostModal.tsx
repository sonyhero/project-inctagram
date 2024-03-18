import React from 'react'

import s from './ClosePostModal.module.scss'

import { postsActions } from '@/entities/posts'
import { modalActions } from '@/features/modal'
import {
  clearDescriptionDB,
  clearPostsDB,
  PostDataBaseType,
  putPostsDataToDB,
} from '@/shared/config/draftDataBase'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Button, Modal, Typography } from '@/shared/ui'

type Props = {
  closeAddPostModal: boolean
}

export const ClosePostModal = ({ closeAddPostModal }: Props) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const photosPosts = useAppSelector(state => state.postsSlice.photosPosts)

  const handleClose = () => {
    clearPostsDB()
    clearDescriptionDB()

    dispatch(postsActions.setActiveIndex(0))
    dispatch(postsActions.deletePhotosPost({}))
    dispatch(modalActions.setCloseExtraModal({}))
    dispatch(modalActions.setCloseModal({}))
  }
  const backToPage = () => {
    dispatch(modalActions.setCloseExtraModal({}))
  }
  const saveDraftHandler = () => {
    dispatch(modalActions.setCloseModal({}))
    dispatch(modalActions.setCloseExtraModal({}))

    photosPosts.forEach(async ({ imageUrl, ...rest }) => {
      const response = await fetch(imageUrl)
      const image = await response.blob()

      const data: PostDataBaseType = {
        ...rest,
        image,
      }

      putPostsDataToDB(data)
      dispatch(postsActions.setActiveIndex(0))
      dispatch(postsActions.deletePhotosPost({}))
    })
  }

  return (
    <Modal
      className={s.modalBlock}
      title={t.create.closeCreatingPost.close}
      open={closeAddPostModal}
      onClose={backToPage}
      isOverlay={false}
    >
      <div className={s.modalContent}>
        <Typography>
          {t.create.closeCreatingPost.doYouWant}
          <br /> {t.create.closeCreatingPost.ifYou}
        </Typography>
        <div className={s.activeWithModal}>
          <Button variant={'outline'} onClick={handleClose}>
            {t.create.closeCreatingPost.discard}
          </Button>
          <Button className={'primary'} onClick={saveDraftHandler}>
            {t.create.closeCreatingPost.saveDraft}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
