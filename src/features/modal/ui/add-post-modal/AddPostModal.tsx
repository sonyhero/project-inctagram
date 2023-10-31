import React, { ChangeEvent, useState } from 'react'

import { v1 } from 'uuid'

import s from './AddPostModal.module.scss'

import { PostType } from '@/entities/profile/model'
import { modalActions, modalSlice } from '@/features/modal'
import { usePhoto } from '@/shared/providers/photo-provider'
import { useAppDispatch } from '@/shared/store'
import { Button, ImageIcon, Modal, Typography } from '@/shared/ui'

type Props = {
  openAddPhotoModal: boolean
}
export const AddPostModal = ({ openAddPhotoModal }: Props) => {
  const { addPhoto } = usePhoto()
  const [errorPhoto, setErrorPhoto] = useState('')

  const dispatch = useAppDispatch()

  const mainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    if (file) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setErrorPhoto('Error! The format of the uploaded photo must PNG and JPEG')
      } else if (file.size > 20 * 1024 * 1024) {
        setErrorPhoto('Error! Photo size must be less than 20 MB!')
      } else {
        setErrorPhoto('')
        const formData = new FormData()
        const photoId = v1()

        formData.append('file', file)

        const newPhoto: PostType = {
          id: photoId,
          photo: formData,
          zoom: [1],
          size: 'Оригинал',
          height: 0,
          width: 0,
        }

        addPhoto(newPhoto)
        dispatch(modalActions.setOpenModal('addPostCroppingModal'))
      }
    }
  }

  const closeAddPhotoModal = () => {
    dispatch(modalSlice.actions.setCloseModal({}))
  }

  return (
    <Modal
      className={s.modalBlock}
      title={'Add Photo'}
      open={openAddPhotoModal}
      onClose={closeAddPhotoModal}
    >
      {
        <div className={s.modalContent}>
          {errorPhoto && (
            <div className={s.modalError}>
              <Typography variant={'regular14'}>{errorPhoto}</Typography>
            </div>
          )}
          <div className={s.modalImg}>
            <ImageIcon height={48} width={48} />
          </div>
          <label htmlFor={'mainPhotoInput'}>
            <Button as={'a'} variant={'primary'}>
              Select from Computer
            </Button>
            <div>
              <input
                type={'file'}
                id={'mainPhotoInput'}
                onChange={mainPhotoSelected}
                className={s.mainPhotoInput}
              />
            </div>
          </label>
          <Button variant={'outline'} className={s.openDraft}>
            Open Draft
          </Button>
        </div>
      }
    </Modal>
  )
}
