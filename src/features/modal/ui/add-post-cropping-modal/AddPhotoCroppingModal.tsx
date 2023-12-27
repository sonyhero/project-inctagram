import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useLiveQuery } from 'dexie-react-hooks'
import NextImage from 'next/image'
import AvatarEditor from 'react-avatar-editor'

import s from './AddPostCroppingModal.module.scss'

import { postsActions, PostType, SizeType } from '@/entities/posts'
import { modalActions } from '@/features/modal'
import { getDataFromDB } from '@/shared/config/draftDataBase'
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
import { getNewPhoto, getReducedImageParams } from '@/shared/utils'

type Props = {
  addPostCroppingModal: boolean
}

export const AddPostCroppingModal = ({ addPostCroppingModal }: Props) => {
  const { t } = useTranslation()
  const photosPosts = useAppSelector(state => state.postsSlice.photosPosts)
  const activeIndex = useAppSelector(state => state.postsSlice.activeIndex)
  const dispatch = useAppDispatch()

  const postsList = useLiveQuery(getDataFromDB)

  useEffect(() => {
    postsList?.forEach(image => {
      const payload: PostType = {
        id: image.id,
        name: image.name,
        type: image.type,
        size: image.size,
        zoom: image.zoom,
        sizeScale: image.sizeScale,
        width: image.width,
        height: image.height,
        imageUrl: URL.createObjectURL(image.image),
        filter: image.filter,
      }

      dispatch(postsActions.setPhotoOfPost(payload))
    })
  }, [postsList])

  const [error, setError] = useState(false)
  const activePhoto = photosPosts[activeIndex]
  const editorRef = useRef<Nullable<AvatarEditor>>(null)

  const iaActivePhoto = photosPosts && photosPosts.length > 0 && activePhoto

  const closeModal = () => {
    dispatch(modalActions.setOpenExtraModal('closeAddPostModal'))
  }
  const opPrevClickHandler = () => {
    dispatch(postsActions.deletePhotosPost({}))
    dispatch(modalActions.setOpenModal('addPostModal'))
  }
  const mainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    if (file && photosPosts.length < 10) {
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
        getNewPhoto({ file, dispatch, activeIndex })
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
    if (photosPosts.length > 0) {
      if (direction === 'next' && activeIndex < photosPosts.length - 1) {
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
            {photosPosts.map((image, index) => {
              const deletePhotoHandler = (id: string) => {
                dispatch(postsActions.deletePhotoOfPost({ id }))

                if (photosPosts.length === 1) {
                  dispatch(modalActions.setOpenModal('addPostModal'))
                }
                if (activeIndex === photosPosts.length - 1) {
                  dispatch(
                    postsActions.setActiveIndex(photosPosts.length > 1 ? photosPosts.length - 2 : 0)
                  )
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
            photosArr={photosPosts}
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
