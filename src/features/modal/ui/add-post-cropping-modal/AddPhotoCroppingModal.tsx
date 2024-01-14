import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useLiveQuery } from 'dexie-react-hooks'
import NextImage from 'next/image'
import AvatarEditor from 'react-avatar-editor'

import s from './AddPostCroppingModal.module.scss'

import { postsActions, PostType, SizeType } from '@/entities/posts'
import { modalActions } from '@/features/modal'
import { getPostsDataFromDB } from '@/shared/config/draftDataBase'
import { useModalImagePagination, useTranslation } from '@/shared/hooks'
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
import { getNewPhoto, getReducedImageParams } from '@/shared/utils'

type Props = {
  addPostCroppingModal: boolean
}

export const AddPostCroppingModal = ({ addPostCroppingModal }: Props) => {
  const { t } = useTranslation()
  const images = useAppSelector(state => state.postsSlice.photosPosts)
  const dispatch = useAppDispatch()

  const postsList = useLiveQuery(getPostsDataFromDB)

  useEffect(() => {
    postsList?.forEach(({ image, ...rest }) => {
      const imageUrl = URL.createObjectURL(image)
      const payload: PostType = {
        ...rest,
        imageUrl,
      }

      const currentPostPhoto = images.find(photoPost => photoPost.id === rest.id)

      if (currentPostPhoto?.id !== rest.id) {
        dispatch(postsActions.setPhotoOfPost(payload))
      }
    })
  }, [postsList])

  const [error, setError] = useState(false)

  const { imageSrc, currentImage, activeIndex, setActiveIndex, nextImage, prevImage } =
    useModalImagePagination({ images })

  const editorRef = useRef<Nullable<AvatarEditor>>(null)

  const iaActivePhoto = images && images.length > 0 && currentImage

  const updateZoomAndUrl = () => {
    const imageUrl = editorRef.current?.getImageScaledToCanvas().toDataURL()

    if (imageUrl) {
      dispatch(postsActions.updateImgUrl({ id: currentImage.id, url: imageUrl }))
    }
    dispatch(postsActions.updateZoom({ id: currentImage.id, zoom: [1] }))
  }
  const closeModal = () => {
    dispatch(modalActions.setOpenExtraModal('closeAddPostModal'))
  }
  const opPrevClickHandler = () => {
    dispatch(postsActions.deletePhotosPost({}))
    dispatch(modalActions.setOpenModal('addPostModal'))
  }
  const mainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    if (file && images.length < 10) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setError(true)
      } else if (file.size > 20 * 1024 * 1024) {
        setError(true)
      } else {
        updateZoomAndUrl()
        setError(false)
        getNewPhoto({ file, dispatch, activeIndex })
      }
    }
  }
  const changeZoom = (zoom: number[]) => {
    if (currentImage) {
      dispatch(postsActions.updateZoom({ id: currentImage.id, zoom }))
    }
  }
  const changeSize = (size: SizeType) => {
    dispatch(postsActions.updateSize({ id: currentImage.id, sizeScale: size }))

    const originalImage = new Image()

    originalImage.src = currentImage.imageUrl

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
      dispatch(postsActions.updateWidthAndHeight({ id: currentImage.id, width, height }))
    }
  }
  const nextImageHandler = () => {
    updateZoomAndUrl()
    nextImage()
  }
  const prevImageHandler = () => {
    updateZoomAndUrl()
    prevImage()
  }
  const nextContentHandler = async () => {
    updateZoomAndUrl()
    dispatch(modalActions.setOpenModal('addPostFilterModal'))
  }

  // DropDownMenu Items
  const dropDownMenuZoom = [
    {
      id: 1,
      component: (
        <div style={{ width: '124px' }}>
          <SuperSlider
            value={currentImage?.zoom}
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
            currentImage?.sizeScale === 'Оригинал' ? s.activeItemOriginal : ''
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
          className={`${s.itemSize} ${currentImage?.sizeScale === '1:1' ? s.activeItem : ''}`}
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
          className={`${s.itemSize} ${currentImage?.sizeScale === '4:5' ? s.activeItem : ''}`}
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
          className={`${s.itemSize} ${currentImage?.sizeScale === '16:9' ? s.activeItem : ''}`}
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
            {images.map((image, index) => {
              const deletePhotoHandler = (id: string) => {
                dispatch(postsActions.deletePhotoOfPost({ id }))

                if (images.length === 1) {
                  dispatch(modalActions.setOpenModal('addPostModal'))
                }
                if (activeIndex === images.length - 1) {
                  setActiveIndex(images.length > 1 ? images.length - 2 : 0)
                }
              }

              const reducedParams =
                image &&
                getReducedImageParams({
                  originalHeight: image.height,
                  originalWidth: image.width,
                  maxSize: 82,
                })

              return (
                <div key={index} className={s.photoItem}>
                  <NextImage
                    alt={`photo ${index}`}
                    src={image.imageUrl}
                    width={reducedParams.reducedWidth}
                    height={reducedParams.reducedHeight}
                  />

                  <div className={s.deletePhoto} onClick={() => deletePhotoHandler(image.id)}>
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
      {iaActivePhoto && (
        <div className={s.modalContent}>
          <AvatarEditor
            ref={editorRef}
            image={imageSrc}
            width={currentImage.width}
            height={currentImage.height}
            border={0}
            color={[24, 27, 27, 0.6]}
            rotate={0}
            disableBoundaryChecks={false}
            disableHiDPIScaling={true}
            scale={currentImage?.zoom?.[0]}
          />
          <PhotoPagination
            photosArr={images}
            changePhotoIndex={setActiveIndex}
            activeIndex={activeIndex}
            changePhotoNext={nextImageHandler}
            changePhotoPrev={prevImageHandler}
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
