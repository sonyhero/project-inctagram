import React, { ChangeEvent, useEffect, useState } from 'react'

import { useLiveQuery } from 'dexie-react-hooks'
import NextImage from 'next/image'
import { toast } from 'react-toastify'

import s from './AddPostPublicationModal.module.scss'

import { Avatar } from '@/entities'
import {
  postsActions,
  UploadIdType,
  useCreatePostMutation,
  useUploadPostImageMutation,
} from '@/entities/posts'
import { useGetProfileQuery } from '@/entities/profile'
import { modalActions, NameExtraModal, NameModal } from '@/features/modal'
import {
  clearDescriptionDB,
  clearPostsDB,
  getPostsDescriptionDataFromDB,
  putPostDescriptionDataToDB,
} from '@/shared/config/draftDataBase'
import { useModalImagePagination, useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Modal, PhotoPagination, TextAreaField, TextField, Typography } from '@/shared/ui'

type Props = {
  addPostPublicationModal: boolean
}

export const AddPostPublicationModal = ({ addPostPublicationModal }: Props) => {
  const { t } = useTranslation()
  const images = useAppSelector(state => state.postsSlice.photosPosts)
  const dispatch = useAppDispatch()

  const { data } = useGetProfileQuery()
  const [createPost] = useCreatePostMutation()
  const [uploadImage] = useUploadPostImageMutation()

  const [photosFormData, serPhotoFormData] = useState<FormData[]>([])
  const [descriptionValue, setDescriptionValue] = useState<string>('')
  const [isPublish, setIsPublish] = useState(true)

  const currentDescriptionValues = useLiveQuery(getPostsDescriptionDataFromDB)

  const { imageSrc, currentImage, activeIndex, setActiveIndex, nextImage, prevImage } =
    useModalImagePagination({ images })

  const iaActivePhoto = images && images.length > 0 && currentImage

  useEffect(() => {
    if (currentDescriptionValues && currentDescriptionValues[0]) {
      setDescriptionValue(currentDescriptionValues[0].currentDescription)
    }
  }, [currentDescriptionValues])

  useEffect(() => {
    const newPhotosFormData = [] as FormData[]

    for (let i = 0; i < images.length; i++) {
      fetch(images[i].imageUrl)
        .then(res => res.blob())
        .then(blob => {
          const formData = new FormData()
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          const img = new Image()

          img.onload = function () {
            if (ctx) {
              canvas.width = images[i].width
              canvas.height = images[i].height

              ctx.filter = images[i].filter
              ctx.drawImage(img, 0, 0, images[i].width, images[i].height)
              canvas.toBlob(blob => {
                if (blob) {
                  formData.append('file', blob)
                  newPhotosFormData.push(formData)

                  if (newPhotosFormData.length === images.length) {
                    serPhotoFormData(newPhotosFormData)
                  }
                }
              })
            }
          }

          img.src = URL.createObjectURL(blob)
        })
    }
  }, [images])

  const closeModal = () => {
    dispatch(modalActions.setOpenExtraModal(NameExtraModal.closeAddPostModal))
    putPostDescriptionDataToDB({ currentDescription: descriptionValue })
  }
  const opPrevClickHandler = () => {
    dispatch(modalActions.setOpenModal(NameModal.addPostFilterModal))
    putPostDescriptionDataToDB({ currentDescription: descriptionValue })
  }

  const onPublishHandler = async () => {
    try {
      setIsPublish(false)
      const uploadPromises = photosFormData.map(formData => {
        const file = formData.get('file')

        if (file) {
          const formData = new FormData()

          formData.append('file', file)

          return uploadImage(formData)
            .unwrap()
            .then(data => {
              if (data.images) {
                return { uploadId: data.images[0].uploadId } as UploadIdType
              }
            })
        }
      })

      const uploadIds = await Promise.all(uploadPromises)

      const filteredUploadIds = uploadIds.filter(Boolean) as UploadIdType[]

      createPost({
        description: descriptionValue,
        childrenMetadata: filteredUploadIds,
      })
        .unwrap()
        .then(postData => {
          dispatch(postsActions.createNewPost(postData))
        })

      dispatch(modalActions.setCloseModal({}))
      dispatch(postsActions.deletePhotosPost({}))
      clearPostsDB()
      clearDescriptionDB()
    } catch (e) {
      toast.error('Some Error')
    } finally {
      setIsPublish(true)
    }
  }

  const onChangeTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const maxLength = 500
    const textValue = event.target.value

    if (textValue.length <= maxLength) {
      setDescriptionValue(textValue)
    }
  }

  return (
    <Modal
      className={s.modalBlock}
      title={t.create.publication.publication}
      open={addPostPublicationModal}
      prevContent={true}
      onClose={closeModal}
      showCloseButton={false}
      prevClick={opPrevClickHandler}
      nextContent={isPublish}
      nextContentTitle={t.create.publication.publish}
      nextClick={onPublishHandler}
      contentBoxClassname={s.contentBox}
    >
      {iaActivePhoto && (
        <div className={s.modalContent}>
          <div className={s.lastPhoto}>
            <NextImage
              alt={'postItem'}
              src={imageSrc}
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
          <div className={s.postDescriptionBlock}>
            <div className={s.topContent}>
              <div className={s.photoBlock}>
                <Avatar className={s.photo} />
                <Typography>{data?.userName}</Typography>
              </div>
              <div>
                <TextAreaField
                  label={t.create.publication.label}
                  placeholder={t.create.publication.placeholder}
                  value={descriptionValue}
                  onChange={onChangeTextHandler}
                  maxLength={500}
                />
                <Typography variant={'small'} color={'secondary'} className={s.balance}>
                  {descriptionValue.length}/500
                </Typography>
              </div>
            </div>
            <div className={s.bottomContent}>
              <TextField
                type={'default'}
                value={'New York'}
                label={t.create.publication.addLocation}
              />
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
