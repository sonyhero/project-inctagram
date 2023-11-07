import React, { ChangeEvent, useState } from 'react'

import { v1 } from 'uuid'

import s from './AddPostModal.module.scss'

import { postsActions, PostType } from '@/entities/posts'
import { modalActions, modalSlice } from '@/features/modal'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Button, ImageIcon, Modal, Typography } from '@/shared/ui'

type Props = {
  openAddPhotoModal: boolean
}
export const AddPostModal = ({ openAddPhotoModal }: Props) => {
  const [errorPhoto, setErrorPhoto] = useState('')
  const photosPost = useAppSelector(state => state.postsSlice.photosPosts)

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
        // const formData = new FormData()
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
          <Button
            variant={'outline'}
            disabled={photosPost.length < 1}
            className={s.openDraft}
            onClick={openDraft}
          >
            Open Draft
          </Button>
        </div>
      }
    </Modal>
  )
}
