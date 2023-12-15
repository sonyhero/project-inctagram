import React, { useMemo, useState } from 'react'

import Image from 'next/image'

import s from './AddPostFilterModal.module.scss'

import { postsActions } from '@/entities/posts'
import { modalActions } from '@/features/modal'
import { filters } from '@/shared/contstants'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Modal, PhotoPagination, Typography } from '@/shared/ui'
import { getReducedImageParams } from '@/shared/utils'

type Props = {
  addPostFilterModal: boolean
}
export const AddPostFilterModal = ({ addPostFilterModal }: Props) => {
  const { t } = useTranslation()
  const photosPosts = useAppSelector(state => state.postsSlice.photosPosts)
  const dispatch = useAppDispatch()

  const [activeIndex, setActiveIndex] = useState(0)
  const activePhoto = photosPosts[activeIndex]

  const iaActivePhoto = photosPosts && photosPosts.length > 0 && activePhoto

  const closeModal = () => {
    dispatch(modalActions.setOpenExtraModal('closeAddPostModal'))
  }
  const opPrevClickHandler = () => {
    dispatch(modalActions.setOpenModal('addPostCroppingModal'))
  }
  const changePhoto = (direction: 'next' | 'prev') => {
    if (photosPosts.length > 0) {
      if (direction === 'next' && activeIndex < photosPosts.length - 1) {
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

  const getFilters = useMemo(() => {
    return filters(t)
  }, [t])

  const reducedParams =
    activePhoto &&
    getReducedImageParams({
      originalHeight: activePhoto.height,
      originalWidth: activePhoto.width,
      maxSize: 108,
    })

  return (
    <Modal
      className={s.modalBlock}
      title={t.create.filters.filters}
      open={addPostFilterModal}
      prevContent={true}
      onClose={closeModal}
      showCloseButton={false}
      prevClick={opPrevClickHandler}
      nextContent={true}
      nextContentTitle={t.create.filters.next}
      nextClick={nextContentHandler}
      contentBoxClassname={s.contentBox}
    >
      {iaActivePhoto && (
        <div className={s.modalContent}>
          <div className={s.filterPhoto}>
            <Image
              src={activePhoto.imageUrl}
              alt={'postItem'}
              width={activePhoto.width}
              height={activePhoto.height}
              style={{
                filter: activePhoto.filter,
              }}
            />
            <PhotoPagination
              photosArr={photosPosts}
              changePhotoIndex={setActiveIndex}
              activeIndex={activeIndex}
              changePhotoNext={() => changePhoto('next')}
              changePhotoPrev={() => changePhoto('prev')}
            />
          </div>
          <div className={s.filters}>
            {getFilters.map(el => {
              return (
                <div
                  className={s.filter}
                  key={el.name}
                  onClick={() => changeFilter(activePhoto.id, el.filter)}
                >
                  <Image
                    alt={el.name}
                    style={{ filter: el.filter }}
                    src={activePhoto.imageUrl}
                    width={reducedParams.reducedWidth}
                    height={reducedParams.reducedHeight}
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
