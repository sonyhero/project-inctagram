import React from 'react'

import s from './ClosePostModal.module.scss'

import { postsActions } from '@/entities/posts'
import { modalActions } from '@/features/modal'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch } from '@/shared/store'
import { Button, Modal, Typography } from '@/shared/ui'

type Props = {
  closeAddPostModal: boolean
}

export const ClosePostModal = ({ closeAddPostModal }: Props) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const handleClose = () => {
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
