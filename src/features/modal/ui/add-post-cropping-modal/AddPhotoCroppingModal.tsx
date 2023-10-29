import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import AvatarEditor from 'react-avatar-editor'
import { v1 } from 'uuid'

import s from './AddPostCroppingModal.module.scss'

import { profileActions } from '@/entities/profile/model'
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
  const photos = useAppSelector(state => state.profileSlice.photos)
  const dispatch = useAppDispatch()

  const [zoom, setZoom] = useState([1])
  const [size, setSize] = useState('Оригинал')
  const [error, setError] = useState(false)
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })
  const [activeIndex, setActiveIndex] = useState(0)

  const editorRef = useRef<Nullable<AvatarEditor>>(null)

  const closeModal = () => {
    dispatch(modalActions.setCloseModal({}))
  }
  const opPrevClickHandler = () => {
    dispatch(modalActions.setOpenModal('addPostModal'))
  }
  const mainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    if (file && photos.length < 10) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setError(true)
      } else if (file.size > 20 * 1024 * 1024) {
        setError(true)
      } else {
        setError(false)
        const formData = new FormData()
        const photoId = v1()

        formData.append('file', file)
        dispatch(profileActions.setPhoto({ id: photoId, photo: formData }))
      }
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && photos && photos.length > 0) {
      const originalImage = new Image()

      originalImage.src = URL.createObjectURL(photos[photos.length - 1].photo.get('file') as Blob)

      originalImage.onload = () => {
        let width, height
        const originalWidth = 492
        const originalHeight = originalImage.height

        switch (size) {
          case '1:1':
            width = Math.min(originalWidth, originalHeight)
            height = 492
            break
          case '16:9':
            width = Math.min(originalWidth, originalHeight)
            height = 492 / (16 / 9)
            break
          case '4:5':
            width = Math.min(originalWidth, originalHeight)
            height = 492 / (4 / 5)
            break
          default:
            width = originalWidth
            height = originalHeight
        }

        setDimensions({ width, height })
      }
    }
  }, [photos, size])

  const dropDownMenuZoom = [
    {
      id: 1,
      component: (
        <div style={{ width: '124px' }}>
          <SuperSlider value={zoom} setValue={setZoom} maxValue={10} minValue={1} step={0.05} />
        </div>
      ),
    },
  ]
  const dropDownMenuSize = [
    {
      id: 1,
      component: (
        <div
          onClick={() => setSize('Оригинал')}
          className={`${s.itemSizeOriginal} ${size === 'Оригинал' ? s.activeItemOriginal : ''}`}
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
          onClick={() => setSize('1:1')}
          className={`${s.itemSize} ${size === '1:1' ? s.activeItem : ''}`}
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
          onClick={() => setSize('4:5')}
          className={`${s.itemSize} ${size === '4:5' ? s.activeItem : ''}`}
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
          onClick={() => setSize('16:9')}
          className={`${s.itemSize} ${size === '16:9' ? s.activeItem : ''}`}
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
            {photos.map((el, index) => {
              const deletePhotoHandler = (id: string) => {
                if (photos.length === 1) {
                  dispatch(modalActions.setOpenModal('addPostModal'))
                }
                dispatch(profileActions.deletePhoto({ id }))
              }

              return (
                <div key={index} className={s.photoItem}>
                  <img
                    src={URL.createObjectURL(el.photo.get('file') as Blob)}
                    className={s.photoDropDown}
                    alt={`photo ${index}`}
                  />
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
      title={'Cropping'}
      open={addPostCroppingModal}
      prevContent={true}
      onClose={closeModal}
      showCloseButton={false}
      prevClick={opPrevClickHandler}
      nextContent={true}
      nextContentTitle={'Next'}
      contentBoxClassname={s.contentBox}
    >
      {
        <div className={s.modalContent}>
          {photos && photos.length > 0 && (
            <>
              <div className={s.back} onClick={() => changePhoto('prev')}>
                <ArrowIosBack />
              </div>
              <AvatarEditor
                ref={editorRef}
                image={URL.createObjectURL(photos[activeIndex].photo.get('file') as Blob)}
                width={dimensions.width}
                height={dimensions.height}
                border={0}
                color={[24, 27, 27, 0.6]}
                rotate={0}
                disableBoundaryChecks={false}
                disableHiDPIScaling={true}
                scale={zoom[0]}
              />
              <div className={s.forvard} onClick={() => changePhoto('next')}>
                <ArrowIosForward />
              </div>
            </>
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
      }
    </Modal>
  )
}
