import React from 'react'

import s from './ClosePostModal.module.scss'

import { postsActions } from '@/entities/posts'
import { modalActions } from '@/features/modal'
import { useAppDispatch } from '@/shared/store'
import { Button, Modal, Typography } from '@/shared/ui'

type Props = {
  closeAddPostModal: boolean
}

export const ClosePostModal = ({ closeAddPostModal }: Props) => {
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
    <Modal className={s.modalBlock} title={'Close'} open={closeAddPostModal} onClose={backToPage}>
      <div className={s.modalContent}>
        <Typography>
          Do you really want to close the creation of a publication?
          <br /> If you close everything will be deleted
        </Typography>
        <div className={s.activeWithModal}>
          <Button variant={'outline'} onClick={handleClose}>
            Discard
          </Button>
          <Button className={'primary'} onClick={saveDraftHandler}>
            Save draft
          </Button>
        </div>
      </div>
    </Modal>
  )
}
