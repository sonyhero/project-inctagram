import React, { useRef, useState } from 'react'

import AvatarEditor from 'react-avatar-editor'

import s from './AddPostFilterModal.module.scss'

import { postsActions } from '@/entities/posts'
import { modalActions } from '@/features/modal'
import { filters } from '@/shared/contstants'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import { ArrowIosBack, ArrowIosForward, Modal, Typography } from '@/shared/ui'

type Props = {
  addPostFilterModal: boolean
}

export const AddPostFilterModal = ({ addPostFilterModal }: Props) => {
  const photosPost = useAppSelector(state => state.postsSlice.photosPosts)
  const [activeIndex, setActiveIndex] = useState(0)
  const activePhoto = photosPost[activeIndex]
  const dispatch = useAppDispatch()

  const editorRef = useRef<Nullable<AvatarEditor>>(null)
  const closeModal = () => {
    dispatch(modalActions.setOpenExtraModal('closeAddPostModal'))
  }
  const opPrevClickHandler = () => {
    dispatch(modalActions.setOpenModal('addPostCroppingModal'))
  }

  const changePhoto = (direction: 'next' | 'prev') => {
    if (photosPost.length > 0) {
      if (direction === 'next' && activeIndex < photosPost.length - 1) {
        setActiveIndex(activeIndex + 1)
      } else if (direction === 'prev' && activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
      }
    }
  }

  const changeFilter = (id: string, filter: string) => {
    dispatch(postsActions.updateFilter({ id, filter }))
  }

  const nextContentHandler = () => {
    dispatch(modalActions.setOpenModal('addPostPublicationsModal'))
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
      nextClick={nextContentHandler}
      contentBoxClassname={s.contentBox}
    >
      {photosPost && photosPost.length > 0 && activePhoto && (
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
              style={{
                filter: activePhoto.filter,
              }}
              disableBoundaryChecks={false}
              disableHiDPIScaling={true}
              scale={activePhoto?.zoom?.[0]}
            />
            {activeIndex < photosPost.length - 1 && (
              <div className={s.forvard} onClick={() => changePhoto('next')}>
                <ArrowIosForward />
              </div>
            )}
          </div>
          <div className={s.filters}>
            {filters.map(el => {
              return (
                <div
                  className={s.filterBlock}
                  key={el.name}
                  onClick={() => changeFilter(activePhoto.id, el.filter)}
                >
                  <img
                    alt={el.name}
                    style={{ filter: el.filter }}
                    src={activePhoto.imageUrl}
                    className={s.filterImg}
                  />
                  <Typography>{el.name}</Typography>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </Modal>
  )
}
