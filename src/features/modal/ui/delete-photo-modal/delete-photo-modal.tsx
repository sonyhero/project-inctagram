import React, { FC } from 'react'

import s from './delete-photo-modal.module.scss'

import { useDeleteAvatarMutation } from '@/entities/profile'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Modal, Typography } from '@/shared/ui'

type PropsType = {
  deletePhotoModal: boolean
  setDeleteModalPhoto: (value: boolean) => void
}
export const DeletePhotoModal: FC<PropsType> = ({ deletePhotoModal, setDeleteModalPhoto }) => {
  const { t } = useTranslation()

  const [deletePhoto] = useDeleteAvatarMutation()
  const deletePhotoHandler = () => {
    deletePhoto()
    setDeleteModalPhoto(false)
  }
  const closeDeleteModal = () => {
    setDeleteModalPhoto(false)
  }

  return (
    <Modal
      className={s.modalBlock}
      title={t.myProfile.generalInformation.deletePhotoModal.deletePhoto}
      open={deletePhotoModal}
      titleFirstButton={t.myProfile.generalInformation.deletePhotoModal.yes}
      titleSecondButton={t.myProfile.generalInformation.deletePhotoModal.no}
      onClose={closeDeleteModal}
      buttonBlockClassName={s.buttonBlock}
      callBack={deletePhotoHandler}
    >
      <Typography variant={'regular16'} className={s.description}>
        {t.myProfile.generalInformation.deletePhotoModal.areYouSure}
      </Typography>
    </Modal>
  )
}
