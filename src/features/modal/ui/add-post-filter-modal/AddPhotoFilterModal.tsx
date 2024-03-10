import React, { useMemo } from 'react'

import Image from 'next/image'

import s from './AddPostFilterModal.module.scss'

import { postsActions } from '@/entities/posts'
import { modalActions, NameExtraModal, NameModal } from '@/features/modal'
import { filters } from '@/shared/contstants'
import { useModalImagePagination, useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Modal, PhotoPagination, Typography } from '@/shared/ui'
import { getReducedImageParams } from '@/shared/utils'

type Props = {
  addPostFilterModal: boolean
}
export const AddPostFilterModal = ({ addPostFilterModal }: Props) => {
  const { t } = useTranslation()
  const images = useAppSelector(state => state.postsSlice.photosPosts)
  const dispatch = useAppDispatch()

  const { imageSrc, currentImage, activeIndex, setActiveIndex, nextImage, prevImage } =
    useModalImagePagination({ images })

  const iaActivePhoto = images && images.length > 0 && currentImage

  const closeModal = () => {
    dispatch(modalActions.setOpenExtraModal(NameExtraModal.closeAddPostModal))
  }
  const opPrevClickHandler = () => {
    dispatch(modalActions.setOpenModal(NameModal.addPostCroppingModal))
  }

  const changeFilter = (id: string, filter: string) => {
    dispatch(postsActions.updateFilter({ id, filter }))
  }
  const nextContentHandler = () => {
    dispatch(modalActions.setOpenModal(NameModal.addPostPublicationsModal))
  }

  const getFilters = useMemo(() => {
    return filters(t)
  }, [t])

  const reducedParams =
    currentImage &&
    getReducedImageParams({
      originalHeight: currentImage.height,
      originalWidth: currentImage.width,
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
              src={imageSrc}
              alt={'postItem'}
              width={currentImage.width}
              height={currentImage.height}
              style={{
                filter: currentImage.filter,
              }}
            />
            <PhotoPagination
              photosArr={images}
              changePhotoIndex={setActiveIndex}
              activeIndex={activeIndex}
              changePhotoNext={nextImage}
              changePhotoPrev={prevImage}
            />
          </div>
          <div className={s.filters}>
            {getFilters.map(el => {
              return (
                <div
                  className={s.filter}
                  key={el.name}
                  onClick={() => changeFilter(currentImage.id, el.filter)}
                >
                  <Image
                    alt={el.name}
                    style={{ filter: el.filter }}
                    src={currentImage.imageUrl}
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
