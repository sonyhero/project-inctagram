import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import ImageNext from 'next/image'
import AvatarEditor from 'react-avatar-editor'

import loaderIcon from '../../../../../public/loader.svg'

import s from './AddPostPublicationModal.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { useCreatePostMutation, useUploadPostImageMutation } from '@/entities/profile/api/postsApi'
import { profileActions } from '@/entities/profile/model'
import { modalActions } from '@/features/modal'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import {
  ArrowIosBack,
  ArrowIosForward,
  Modal,
  TextAreaField,
  TextField,
  Typography,
} from '@/shared/ui'

type Props = {
  addPostPublicationModal: boolean
  userId: number
}

export const AddPostPublicationModal = ({ addPostPublicationModal, userId }: Props) => {
  const photosPost = useAppSelector(state => state.profileSlice.photosPosts)
  const { data } = useGetProfileQuery(userId)
  const [activeIndex, setActiveIndex] = useState(0)
  const activePhoto = photosPost[activeIndex]
  const [photosFormData, serPhotoFormData] = useState<FormData[]>([])
  const [createPost] = useCreatePostMutation()
  const [uploadImage] = useUploadPostImageMutation()
  const [value, setValue] = useState('')

  const dispatch = useAppDispatch()

  const editorRef = useRef<Nullable<AvatarEditor>>(null)
  const closeModal = () => {
    dispatch(modalActions.setOpenExtraModal('closeAddPostModal'))
  }
  const opPrevClickHandler = () => {
    dispatch(modalActions.setOpenModal('addPostFilterModal'))
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
  const profileAvatarLoader = () =>
    data?.avatars.length && {
      loader: () => data.avatars[0].url,
      className: s.photo,
    }

  useEffect(() => {
    const newPhotosFormData = [] as FormData[]

    for (let i = 0; i < photosPost.length; i++) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (canvas && ctx) {
        canvas.width = photosPost[i].width
        canvas.height = photosPost[i].height

        const image = new Image()

        image.onload = () => {
          // Применяем фильтры

          ctx.filter = photosPost[i].filter
          const scale = photosPost[i].zoom[0]
          const zoomedWidth = photosPost[i].width * scale
          const zoomedHeight = photosPost[i].height * scale

          // Отрисовываем изображение на canvas с примененными фильтрами и зумом
          ctx.drawImage(image, 0, 0, zoomedWidth, zoomedHeight)

          // Преобразуем canvas в Data URL
          const editedImageDataURL = canvas.toDataURL('image/jpeg')

          // Преобразуем Data URL в Blob
          fetch(editedImageDataURL)
            .then(res => res.blob())
            .then(blob => {
              const formData = new FormData()

              formData.append('file', blob)
              newPhotosFormData.push(formData)

              if (newPhotosFormData.length === photosPost.length) {
                serPhotoFormData(newPhotosFormData)
              }
            })
        }

        image.src = photosPost[i].imageUrl
      }
    }
  }, [photosPost])
  const onPublishHandler = () => {
    const formData = new FormData()

    for (let i = 0; i < photosFormData.length; i++) {
      const file = photosFormData[i].get('file')

      if (file) {
        formData.append('file', file)
      }
    }
    uploadImage(formData)
      .unwrap()
      .then(data => {
        const uploadId = []

        for (let i = 0; i < data.images.length; i += 2) {
          if (data.images[i]) {
            uploadId.push({ uploadId: data.images[i].uploadId })
          }
        }

        createPost({ description: value, childrenMetadata: uploadId })
        dispatch(modalActions.setCloseModal({}))
        dispatch(profileActions.deletePhotosPost({}))
      })
  }

  const onChangeTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value)
  }

  return (
    <Modal
      className={s.modalBlock}
      title={'Publication'}
      open={addPostPublicationModal}
      prevContent={true}
      onClose={closeModal}
      showCloseButton={false}
      prevClick={opPrevClickHandler}
      nextContent={true}
      nextContentTitle={'Publish'}
      nextClick={onPublishHandler}
      contentBoxClassname={s.contentBox}
    >
      {photosPost && photosPost.length > 0 && activePhoto && (
        <div className={s.modalContent}>
          <div className={s.lastPhoto}>
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
          <div className={s.postDescriptionBlock}>
            <div className={s.topContent}>
              <div className={s.photoBlock}>
                <ImageNext
                  src={loaderIcon}
                  priority={true}
                  {...profileAvatarLoader()}
                  alt={'profilePhoto'}
                />
                <Typography>{data?.userName}</Typography>
              </div>
              <div>
                <TextAreaField
                  label={'Add publication descriptions'}
                  placeholder={'Add your description'}
                  value={value}
                  onChange={onChangeTextHandler}
                  disabled={value.length > 500}
                />
                <Typography variant={'small'} color={'secondary'} className={s.balance}>
                  {value.length}/500
                </Typography>
              </div>
            </div>
            <div className={s.bottomContent}>
              <TextField type={'default'} value={'New York'} label={'Add location'} />
              <div className={s.items}>
                <div className={s.item}>
                  <Typography>New York</Typography>
                  <Typography variant={'small'} color={'secondary'}>
                    Washington Square Park
                  </Typography>
                </div>
                <div className={s.item}>
                  <Typography>New York</Typography>
                  <Typography variant={'small'} color={'secondary'}>
                    Washington Square Park
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}

// const onPublishHandler = () => {
//   const newPhotosFormData = [] as FormData[]
//
//   for (const photo of photos) {
//     const canvas = document.createElement('canvas')
//     const ctx = canvas.getContext('2d')
//
//     if (canvas && ctx) {
//       canvas.width = photo.width
//       canvas.height = photo.height
//
//       const image = new Image()
//
//       image.src = photo.imageUrl
//
//       image.onload = () => {
//         // Создаем новый div-элемент для AvatarEditor
//         const editorContainer = document.createElement('div')
//
//         document.body.appendChild(editorContainer)
//
//         // Создаем новый AvatarEditor
//         const editor = new AvatarEditor(
//           {
//             image: image,
//             width: photo.width,
//             height: photo.height,
//             scale: photo.zoom[0],
//             style: { filter: photo.filter },
//           },
//           editorContainer
//         )
//
//         // Отрисовываем изображение с примененными filter и zoom
//         const editedImage = editor.getImage()
//
//         // Отрисовываем editedImage на canvas
//         ctx.drawImage(editedImage, 0, 0, photo.width, photo.height)
//
//         // Преобразуем canvas в Blob и добавляем его к FormData
//         canvas.toBlob(blob => {
//           if (blob) {
//             const formData = new FormData()
//
//             formData.append('files', blob)
//
//             newPhotosFormData.push(formData)
//
//             if (newPhotosFormData.length === photos.length) {
//               serPhotoFormData(newPhotosFormData)
//
//               // Удаляем временный div-элемент
//               document.body.removeChild(editorContainer)
//             }
//           }
//         }, 'image/jpeg')
//       }
//     }
//   }
// }
