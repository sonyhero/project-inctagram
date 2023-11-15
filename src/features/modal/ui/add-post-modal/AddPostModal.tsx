import React, { ChangeEvent, useState } from 'react'

import { v1 } from 'uuid'

import s from './AddPostModal.module.scss'

import { postsActions, PostType } from '@/entities/posts'
import { modalActions, modalSlice } from '@/features/modal'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Button, ErrorValidPhoto, Modal, PhotoPlaceholder } from '@/shared/ui'

type Props = {
  openAddPhotoModal: boolean
}
export const AddPostModal = ({ openAddPhotoModal }: Props) => {
  const [errorPhoto, setErrorPhoto] = useState('')
  const { t } = useTranslation()
  const photosPost = useAppSelector(state => state.postsSlice.photosPosts)
  const dispatch = useAppDispatch()

  const mainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(postsActions.setCurrentDescription({ currentDescription: '' }))
    const file = event.target.files && event.target.files[0]

    if (file) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setErrorPhoto(t.create.addPost.errorType)
      } else if (file.size > 20 * 1024 * 1024) {
        setErrorPhoto(t.create.addPost.errorSize)
      } else {
        setErrorPhoto('')
        const photoId = v1()

        const image = new Image()

        image.src = URL.createObjectURL(file)
        image.onload = () => {
          const newPhoto: PostType = {
            id: photoId,
            name: file.name,
            type: file.type,
            size: file.size,
            zoom: [1],
            sizeScale: 'Оригинал',
            width: 492,
            height: image.height,
            imageUrl: URL.createObjectURL(file),
            filter: 'none',
          }

          dispatch(postsActions.setPhotoOfPost(newPhoto))
          dispatch(modalActions.setOpenModal('addPostCroppingModal'))
        }
      }
    }
  }
  const closeAddPhotoModal = () => {
    dispatch(modalSlice.actions.setCloseModal({}))
  }
  const openDraft = () => {
    dispatch(modalActions.setOpenModal('addPostCroppingModal'))
  }

  return (
    <Modal
      className={s.modalBlock}
      title={t.create.addPost.addPhoto}
      open={openAddPhotoModal}
      onClose={closeAddPhotoModal}
    >
      {
        <div className={s.modalContent}>
          {errorPhoto && <ErrorValidPhoto error={errorPhoto} />}
          <PhotoPlaceholder />
          <label htmlFor={'mainPhotoInput'}>
            <Button as={'a'} variant={'primary'}>
              {t.create.addPost.select}
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
          <Button
            variant={'outline'}
            disabled={photosPost.length < 1}
            className={s.openDraft}
            onClick={openDraft}
          >
            {t.create.addPost.openDraft}
          </Button>
        </div>
      }
    </Modal>
  )
}
