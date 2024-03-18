import React from 'react'

import s from './PhotoPagination.module.scss'

import { ArrowIosBack, ArrowIosForward } from '@/shared/ui'

type Props = {
  photosArr?: any[]
  changePhotoIndex: (index: number) => void
  activeIndex: number
  changePhotoNext: () => void
  changePhotoPrev: () => void
}

export const PhotoPagination = (props: Props) => {
  const { photosArr, changePhotoIndex, activeIndex, changePhotoPrev, changePhotoNext } = props

  return photosArr ? (
    <>
      {activeIndex > 0 && (
        <div className={s.back} onClick={changePhotoPrev}>
          <ArrowIosBack />
        </div>
      )}
      {photosArr.length >= 2 && (
        <div className={s.carouselPagination}>
          {photosArr.map((_, index) => (
            <button
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === activeIndex}
              className={`${s.paginationIndicator} ${index === activeIndex ? s.active : ''}`}
              key={index}
              onClick={() => changePhotoIndex(index)}
            ></button>
          ))}
        </div>
      )}
      {activeIndex < photosArr.length - 1 && (
        <div className={s.forvard} onClick={changePhotoNext}>
          <ArrowIosForward />
        </div>
      )}
    </>
  ) : null
}
