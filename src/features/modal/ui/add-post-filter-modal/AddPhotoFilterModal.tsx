import React, { useMemo, useState } from 'react'

import s from './AddPostFilterModal.module.scss'

import { postsActions } from '@/entities/posts'
import { modalActions } from '@/features/modal'
import { filters } from '@/shared/contstants'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Modal, PhotoPagination, Typography } from '@/shared/ui'

type Props = {
  addPostFilterModal: boolean
}
export const AddPostFilterModal = ({ addPostFilterModal }: Props) => {
  const { t } = useTranslation()
  const photosPost = useAppSelector(state => state.postsSlice.photosPosts)
  const dispatch = useAppDispatch()

  const [activeIndex, setActiveIndex] = useState(0)
  const activePhoto = photosPost[activeIndex]

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

  const getFilters = useMemo(() => {
    return filters(t)
  }, [t])

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
      {photosPost && photosPost.length > 0 && activePhoto && (
        <div className={s.modalContent}>
          <div className={s.filterPhoto}>
            <img
              alt={'postItem'}
              src={activePhoto.imageUrl}
              width={activePhoto.width}
              height={activePhoto.height}
              style={{
                filter: activePhoto.filter,
              }}
            />
            <PhotoPagination
              photosArr={photosPost}
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
                  <img alt={el.name} style={{ filter: el.filter }} src={activePhoto.imageUrl} />
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
