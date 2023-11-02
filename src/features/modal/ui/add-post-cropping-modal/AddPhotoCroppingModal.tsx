import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import AvatarEditor from 'react-avatar-editor'
import { v1 } from 'uuid'

import s from './AddPostCroppingModal.module.scss'

import { PostType, profileActions, SizeType } from '@/entities/profile/model'
import { modalActions } from '@/features/modal'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import {
  ArrowIosBack,
  ArrowIosForward,
  Close,
  Expand,
  ImageIcon,
  Maximize,
  Modal,
  PlusCircle,
  Size16to9,
  Size1to1,
  Size4to5,
  SizeOriginal,
  SuperSlider,
  Typography,
} from '@/shared/ui'
import { DropDownMenu } from '@/shared/ui/drop-down-menu'

type Props = {
  addPostCroppingModal: boolean
}

export const AddPostCroppingModal = ({ addPostCroppingModal }: Props) => {
  const photosPost = useAppSelector(state => state.profileSlice.photosPosts)
  const [activeIndex, setActiveIndex] = useState(0)
  const [error, setError] = useState(false)
  const activePhoto = photosPost[activeIndex]
  const dispatch = useAppDispatch()

  const editorRef = useRef<Nullable<AvatarEditor>>(null)

  const closeModal = () => {
    dispatch(modalActions.setOpenExtraModal('closeAddPostModal'))
  }
  const opPrevClickHandler = () => {
    dispatch(profileActions.deletePhotosPost({}))
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
        setError(false)
        // const formData = new FormData()
        const photoId = v1()

        const image = new Image()

        image.src = URL.createObjectURL(file)
        image.onload = () => {
          const newPhoto: PostType = {
            id: photoId,
            name: file.name,
            type: file.type,
            size: file.size,
            zoom: [1],
            sizeScale: 'Оригинал',
            width: 492,
            height: image.height,
            imageUrl: URL.createObjectURL(file),
            filter: 'none',
          }

          dispatch(profileActions.setPhotoOfPost(newPhoto))
          setActiveIndex(activeIndex + 1)
        }
      }
    }
  }
  const changeZoom = (zoom: number[]) => {
    if (activePhoto) {
      // updateZoom(activePhoto.id, zoom)
      dispatch(profileActions.updateZoom({ id: activePhoto.id, zoom }))
    }
  }
  const changeSize = (size: SizeType) => {
    dispatch(profileActions.updateSize({ id: activePhoto.id, sizeScale: size }))

    const originalImage = new Image()

    originalImage.src = activePhoto.imageUrl

    originalImage.onload = () => {
      let width, height
      const maxWidth = 492
      const originalHeight = originalImage.height

      switch (size) {
        case '1:1':
          width = Math.min(maxWidth, originalHeight)
          height = 492
          break
        case '16:9':
          width = Math.min(maxWidth, originalHeight)
          height = maxWidth / (16 / 9)
          break
        case '4:5':
          width = Math.min(maxWidth, originalHeight)
          height = maxWidth / (4 / 5)
          break
        default:
          width = maxWidth
          height = originalHeight
      }
      dispatch(profileActions.updateWidthAndHeight({ id: activePhoto.id, width, height }))
    }
  }

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
          <Typography>Оригинал</Typography>
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
                dispatch(profileActions.deletePhotoOfPost({ id }))

                if (photosPost.length === 1) {
                  dispatch(modalActions.setOpenModal('addPostModal'))
                }
                if (activeIndex === photosPost.length - 1) {
                  setActiveIndex(photosPost.length > 1 ? photosPost.length - 2 : 0)
                }
              }

              return (
                <div key={index} className={s.photoItem}>
                  <img src={el.imageUrl} className={s.photoDropDown} alt={`photo ${index}`} />
                  <div className={s.deletePhoto} onClick={() => deletePhotoHandler(el.id)}>
                    <Close />
                  </div>
                </div>
              )
            })}
          </div>
          <div className={s.addNewPhoto}>
            <label>
              <input
                type={'file'}
                id={'mainPhotoInput'}
                onChange={mainPhotoSelected}
                className={s.addPhotoInput}
              />
              <PlusCircle className={error ? s.error : ''} />
            </label>
          </div>
        </div>
      ),
    },
  ]

  const changePhoto = (direction: 'next' | 'prev') => {
    if (photosPost.length > 0) {
      if (direction === 'next' && activeIndex < photosPost.length - 1) {
        setActiveIndex(activeIndex + 1)
      } else if (direction === 'prev' && activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
      }
    }
  }
  const nextContentHandler = () => {
    dispatch(modalActions.setOpenModal('addPostFilterModal'))
  }

  return (
    <Modal
      className={s.modalBlock}
      title={'Cropping'}
      open={addPostCroppingModal}
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
          {activeIndex < photosPost.length - 1 && (
            <div className={s.forvard} onClick={() => changePhoto('next')}>
              <ArrowIosForward />
            </div>
          )}
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
