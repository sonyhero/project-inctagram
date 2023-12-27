import React, { ChangeEvent, useState } from 'react'

import { useLiveQuery } from 'dexie-react-hooks'

import s from './AddPostModal.module.scss'

import { postsActions } from '@/entities/posts'
import { modalActions, modalSlice } from '@/features/modal'
import { clearDB, getDataFromDB } from '@/shared/config/draftDataBase'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch } from '@/shared/store'
import { Button, ErrorValidPhoto, Modal, PhotoPlaceholder } from '@/shared/ui'
import { getNewPhoto } from '@/shared/utils'

type Props = {
  openAddPhotoModal: boolean
}
export const AddPostModal = ({ openAddPhotoModal }: Props) => {
  const [errorPhoto, setErrorPhoto] = useState('')
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const postsList = useLiveQuery(getDataFromDB)

  const showDraftButton = postsList && postsList.length < 1

  const mainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    clearDB()
    dispatch(postsActions.setCurrentDescription({ currentDescription: '' }))
    const file = event.target.files && event.target.files[0]

    if (file) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setErrorPhoto(t.create.addPost.errorType)
      } else if (file.size > 20 * 1024 * 1024) {
        setErrorPhoto(t.create.addPost.errorSize)
      } else {
        setErrorPhoto('')
        getNewPhoto({ file, dispatch, isModalPayload: true })
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
          {!showDraftButton && (
            <Button variant={'outline'} className={s.openDraft} onClick={openDraft}>
              {t.create.addPost.openDraft}
            </Button>
          )}
        </div>
      }
    </Modal>
  )
}
