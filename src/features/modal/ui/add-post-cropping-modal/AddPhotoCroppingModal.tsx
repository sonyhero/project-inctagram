import React, { ChangeEvent, useRef, useState } from 'react'

import NextImage from 'next/image'
import AvatarEditor from 'react-avatar-editor'
import { v1 } from 'uuid'

import s from './AddPostCroppingModal.module.scss'

import { postsActions, PostType, SizeType } from '@/entities/posts'
import { modalActions } from '@/features/modal'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import {
  Close,
  Expand,
  ImageIcon,
  Maximize,
  Modal,
  PhotoPagination,
  PlusCircle,
  Size16to9,
  Size1to1,
  Size4to5,
  SizeOriginal,
  SuperSlider,
  Typography,
} from '@/shared/ui'
import { DropDownMenu } from '@/shared/ui/drop-down-menu'
import { getReducedImageParams } from '@/shared/utils/getReducedOriginalImgSize'

type Props = {
  addPostCroppingModal: boolean
}

export const AddPostCroppingModal = ({ addPostCroppingModal }: Props) => {
  const { t } = useTranslation()
  const photosPost = useAppSelector(state => state.postsSlice.photosPosts)
  const activeIndex = useAppSelector(state => state.postsSlice.activeIndex)
  const dispatch = useAppDispatch()

  const [error, setError] = useState(false)
  const activePhoto = photosPost[activeIndex]
  const editorRef = useRef<Nullable<AvatarEditor>>(null)

  const closeModal = () => {
    dispatch(modalActions.setOpenExtraModal('closeAddPostModal'))
  }
  const opPrevClickHandler = () => {
    dispatch(postsActions.deletePhotosPost({}))
    dispatch(modalActions.setOpenModal('addPostModal'))
  }

  const mainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    if (file && photosPost.length < 10) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setError(true)
      } else if (file.size > 20 * 1024 * 1024) {
        setError(true)
      } else {
        const imageUrl = editorRef.current?.getImageScaledToCanvas().toDataURL()

        if (imageUrl) {
          dispatch(postsActions.updateImgUrl({ id: activePhoto.id, url: imageUrl }))
        }
        dispatch(postsActions.updateZoom({ id: activePhoto.id, zoom: [1] }))

        setError(false)
        const photoId = v1()

        const image = new Image()

        image.src = URL.createObjectURL(file)
        image.onload = () => {
          const { reducedHeight, reducedWidth } = getReducedImageParams({
            originalWidth: image.width,
            originalHeight: image.height,
          })

          const newPhoto: PostType = {
            id: photoId,
            name: file.name,
            type: file.type,
            size: file.size,
            zoom: [1],
            sizeScale: 'Оригинал',
            width: reducedWidth,
            height: reducedHeight,
            imageUrl: URL.createObjectURL(file),
            filter: 'none',
          }

          dispatch(postsActions.setPhotoOfPost(newPhoto))
          dispatch(postsActions.setActiveIndex(activeIndex + 1))
        }
      }
    }
  }
  const changeZoom = (zoom: number[]) => {
    if (activePhoto) {
      dispatch(postsActions.updateZoom({ id: activePhoto.id, zoom }))
    }
  }
  const changeSize = (size: SizeType) => {
    dispatch(postsActions.updateSize({ id: activePhoto.id, sizeScale: size }))

    const originalImage = new Image()

    originalImage.src = activePhoto.imageUrl

    originalImage.onload = () => {
      let width, height

      const { originalHeight, reducedWidth, reducedHeight, maxSize } = getReducedImageParams({
        originalWidth: originalImage.width,
        originalHeight: originalImage.height,
      })

      switch (size) {
        case '1:1':
          width = Math.min(maxSize, originalHeight)
          height = maxSize
          break
        case '16:9':
          width = Math.min(maxSize, originalHeight)
          height = maxSize / (16 / 9)

          break
        case '4:5':
          width = Math.min(maxSize, originalHeight) * (4 / 5)
          height = maxSize
          break
        default:
          width = reducedWidth
          height = reducedHeight
      }
      dispatch(postsActions.updateWidthAndHeight({ id: activePhoto.id, width, height }))
    }
  }
  const changePhoto = async (direction: 'next' | 'prev') => {
    if (photosPost.length > 0) {
      if (direction === 'next' && activeIndex < photosPost.length - 1) {
        const imageUrl = editorRef.current?.getImageScaledToCanvas().toDataURL()

        if (imageUrl) {
          dispatch(postsActions.updateImgUrl({ id: activePhoto.id, url: imageUrl }))
        }
        dispatch(postsActions.updateZoom({ id: activePhoto.id, zoom: [1] }))
        dispatch(postsActions.setActiveIndex(activeIndex + 1))
      } else if (direction === 'prev' && activeIndex > 0) {
        const imageUrl = editorRef.current?.getImageScaledToCanvas().toDataURL()

        if (imageUrl) {
          dispatch(postsActions.updateImgUrl({ id: activePhoto.id, url: imageUrl }))
        }
        dispatch(postsActions.updateZoom({ id: activePhoto.id, zoom: [1] }))
        dispatch(postsActions.setActiveIndex(activeIndex - 1))
      }
    }
  }
  const nextContentHandler = async () => {
    const imageUrl = editorRef.current?.getImageScaledToCanvas().toDataURL()

    if (imageUrl) {
      dispatch(postsActions.updateImgUrl({ id: activePhoto.id, url: imageUrl }))
    }
    dispatch(postsActions.updateZoom({ id: activePhoto.id, zoom: [1] }))
    dispatch(modalActions.setOpenModal('addPostFilterModal'))
  }
  const changePhotoIndex = (index: number) => {
    dispatch(postsActions.setActiveIndex(index))
  }

  // DropDownMenu Items
  const dropDownMenuZoom = [
    {
      id: 1,
      component: (
        <div style={{ width: '124px' }}>
          <SuperSlider
            value={activePhoto?.zoom}
            setValue={changeZoom}
            maxValue={10}
            minValue={1}
            step={0.05}
          />
        </div>
      ),
    },
  ]
  const dropDownMenuSize = [
    {
      id: 1,
      component: (
        <div
          onClick={() => changeSize('Оригинал')}
          className={`${s.itemSizeOriginal} ${
            activePhoto?.sizeScale === 'Оригинал' ? s.activeItemOriginal : ''
          }`}
        >
          <Typography>{t.create.croppingModal.original}</Typography>
          <SizeOriginal />
        </div>
      ),
    },
    {
      id: 2,
      component: (
        <div
          onClick={() => changeSize('1:1')}
          className={`${s.itemSize} ${activePhoto?.sizeScale === '1:1' ? s.activeItem : ''}`}
        >
          <Typography>1:1</Typography>
          <Size1to1 />
        </div>
      ),
    },
    {
      id: 3,
      component: (
        <div
          onClick={() => changeSize('4:5')}
          className={`${s.itemSize} ${activePhoto?.sizeScale === '4:5' ? s.activeItem : ''}`}
        >
          <Typography>4:5</Typography>
          <Size4to5 />
        </div>
      ),
    },
    {
      id: 4,
      component: (
        <div
          onClick={() => changeSize('16:9')}
          className={`${s.itemSize} ${activePhoto?.sizeScale === '16:9' ? s.activeItem : ''}`}
        >
          <Typography>16:9</Typography>
          <Size16to9 />
        </div>
      ),
    },
  ]
  const dropDownMenuPhotos = [
    {
      id: 1,
      component: (
        <div className={s.photoBlock}>
          <div className={s.photos}>
            {photosPost.map((el, index) => {
              const deletePhotoHandler = (id: string) => {
                dispatch(postsActions.deletePhotoOfPost({ id }))

                if (photosPost.length === 1) {
                  dispatch(modalActions.setOpenModal('addPostModal'))
                }
                if (activeIndex === photosPost.length - 1) {
                  dispatch(
                    postsActions.setActiveIndex(photosPost.length > 1 ? photosPost.length - 2 : 0)
                  )
                }
              }

              const reducedParams =
                el &&
                getReducedImageParams({
                  originalHeight: el.height,
                  originalWidth: el.width,
                  maxSize: 82,
                })

              return (
                <div key={index} className={s.photoItem}>
                  <NextImage
                    alt={`photo ${index}`}
                    src={el.imageUrl}
                    width={reducedParams.reducedWidth}
                    height={reducedParams.reducedHeight}
                  />

                  <div className={s.deletePhoto} onClick={() => deletePhotoHandler(el.id)}>
                    <Close />
                  </div>
                </div>
              )
            })}
          </div>
          <div className={s.addNewPhoto}>
            <label className={s.addPhotoInputBlock}>
              <input
                type={'file'}
                id={'mainPhotoInput'}
                onChange={mainPhotoSelected}
                className={s.addPhotoInput}
              />
              <PlusCircle className={error ? s.error : s.noError} />
            </label>
          </div>
        </div>
      ),
    },
  ]

  return (
    <Modal
      className={s.modalBlock}
      title={t.create.croppingModal.cropping}
      open={addPostCroppingModal}
      prevContent={true}
      onClose={closeModal}
      showCloseButton={false}
      prevClick={opPrevClickHandler}
      nextContent={true}
      nextContentTitle={t.create.croppingModal.next}
      nextClick={nextContentHandler}
      contentBoxClassname={s.contentBox}
    >
      {photosPost && photosPost.length > 0 && activePhoto && (
        <div className={s.modalContent}>
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
          <PhotoPagination
            photosArr={photosPost}
            changePhotoIndex={changePhotoIndex}
            activeIndex={activeIndex}
            changePhotoNext={() => changePhoto('next')}
            changePhotoPrev={() => changePhoto('prev')}
          />
          <div className={s.activities}>
            <div className={s.activityLeft}>
              <div className={s.activity}>
                <DropDownMenu trigger={<Expand />} items={dropDownMenuSize} />
              </div>
              <div className={s.activity}>
                <DropDownMenu trigger={<Maximize />} items={dropDownMenuZoom} />
              </div>
            </div>
            <div className={s.activity}>
              <ImageIcon />
              <DropDownMenu trigger={<ImageIcon />} items={dropDownMenuPhotos} align={'end'} />
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
