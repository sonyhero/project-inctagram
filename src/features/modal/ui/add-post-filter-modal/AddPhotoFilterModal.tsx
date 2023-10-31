import React, { useRef, useState } from 'react'

import AvatarEditor from 'react-avatar-editor'

import s from './AddPostFilterModal.module.scss'

import { modalActions } from '@/features/modal'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import { ArrowIosBack, ArrowIosForward, Modal, Typography } from '@/shared/ui'

type Props = {
  addPostFilterModal: boolean
}

export const AddPostFilterModal = ({ addPostFilterModal }: Props) => {
  const photos = useAppSelector(state => state.profileSlice.photos)
  const [activeIndex, setActiveIndex] = useState(0)
  const activePhoto = photos[activeIndex]
  const dispatch = useAppDispatch()

  const editorRef = useRef<Nullable<AvatarEditor>>(null)

  const closeModal = () => {
    dispatch(modalActions.setCloseModal({}))
  }
  const opPrevClickHandler = () => {
    dispatch(modalActions.setOpenModal('addPostCroppingModal'))
  }

  const changePhoto = (direction: 'next' | 'prev') => {
    if (photos.length > 0) {
      if (direction === 'next' && activeIndex < photos.length - 1) {
        setActiveIndex(activeIndex + 1)
      } else if (direction === 'prev' && activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
      }
    }
  }

  return (
    <Modal
      className={s.modalBlock}
      title={'Filters'}
      open={addPostFilterModal}
      prevContent={true}
      onClose={closeModal}
      showCloseButton={false}
      prevClick={opPrevClickHandler}
      nextContent={true}
      nextContentTitle={'Next'}
      contentBoxClassname={s.contentBox}
    >
      {photos && photos.length > 0 && activePhoto && (
        <div className={s.modalContent}>
          <div className={s.filterPhoto}>
            {activeIndex > 0 && (
              <div className={s.back} onClick={() => changePhoto('prev')}>
                <ArrowIosBack />
              </div>
            )}
            <AvatarEditor
              ref={editorRef}
              image={activePhoto.imageUrl}
              width={activePhoto.width}
              height={activePhoto.height}
              border={0}
              color={[24, 27, 27, 0.6]}
              rotate={0}
              disableBoundaryChecks={false}
              disableHiDPIScaling={true}
              scale={activePhoto?.zoom?.[0]}
            />
            {activeIndex < photos.length - 1 && (
              <div className={s.forvard} onClick={() => changePhoto('next')}>
                <ArrowIosForward />
              </div>
            )}
          </div>
          <div className={s.filters}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(el => {
              return (
                <div className={s.filterBlock} key={el}>
                  <img src={activePhoto.imageUrl} className={s.filterImg} />
                  <Typography>Normal</Typography>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </Modal>
  )
}
