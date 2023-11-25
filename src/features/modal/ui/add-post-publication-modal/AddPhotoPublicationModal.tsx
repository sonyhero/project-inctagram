import React, { ChangeEvent, useEffect, useState } from 'react'

import s from './AddPostPublicationModal.module.scss'

import { Avatar } from '@/entities'
import {
  PostArgsTypeChildrenMetadata,
  postsActions,
  useCreatePostMutation,
  useUploadPostImageMutation,
} from '@/entities/posts'
import { useGetProfileQuery } from '@/entities/profile'
import { modalActions } from '@/features/modal'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Modal, PhotoPagination, TextAreaField, TextField, Typography } from '@/shared/ui'

type Props = {
  addPostPublicationModal: boolean
  userId: number
}

export const AddPostPublicationModal = ({ addPostPublicationModal, userId }: Props) => {
  const { t } = useTranslation()
  const photosPost = useAppSelector(state => state.postsSlice.photosPosts)
  const publicationCount = useAppSelector(state => state.postsSlice.publicationCount)
  const currentDescription = useAppSelector(state => state.postsSlice.currentDescription)
  const dispatch = useAppDispatch()

  const { data } = useGetProfileQuery(userId)
  const [createPost] = useCreatePostMutation()
  const [uploadImage] = useUploadPostImageMutation()

  const [activeIndex, setActiveIndex] = useState(0)
  const activePhoto = photosPost[activeIndex]
  const [photosFormData, serPhotoFormData] = useState<FormData[]>([])
  const [descriptionValue, setDescriptionValue] = useState(currentDescription)

  const iaActivePhoto = photosPost && photosPost.length > 0 && activePhoto

  useEffect(() => {
    const newPhotosFormData = [] as FormData[]

    for (let i = 0; i < photosPost.length; i++) {
      fetch(photosPost[i].imageUrl)
        .then(res => res.blob())
        .then(blob => {
          const formData = new FormData()
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          const img = new Image()

          img.onload = function () {
            if (ctx) {
              canvas.width = photosPost[i].width
              canvas.height = photosPost[i].height

              ctx.filter = photosPost[i].filter
              ctx.drawImage(img, 0, 0, photosPost[i].width, photosPost[i].height)
              canvas.toBlob(blob => {
                if (blob) {
                  formData.append('file', blob)
                  newPhotosFormData.push(formData)

                  if (newPhotosFormData.length === photosPost.length) {
                    serPhotoFormData(newPhotosFormData)
                  }
                }
              })
            }
          }

          img.src = URL.createObjectURL(blob)
        })
    }
  }, [])
  const closeModal = () => {
    dispatch(modalActions.setOpenExtraModal('closeAddPostModal'))
    dispatch(postsActions.setCurrentDescription({ currentDescription: descriptionValue }))
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
  const onPublishHandler = async () => {
    const uploadPromises = photosFormData.map(formData => {
      const file = formData.get('file')

      if (file) {
        const formData = new FormData()

        formData.append('file', file)

        return uploadImage(formData)
          .unwrap()
          .then(data => {
            if (data.images) {
              return { uploadId: data.images[0].uploadId } as PostArgsTypeChildrenMetadata
            }
          })
      }
    })

    const uploadIds = await Promise.all(uploadPromises)

    const filteredUploadIds = uploadIds.filter(Boolean) as PostArgsTypeChildrenMetadata[]

    createPost({
      description:
        descriptionValue.length > 500 ? descriptionValue.slice(0, 500) : descriptionValue,
      childrenMetadata: filteredUploadIds,
    })
      .unwrap()
      .then(postData => {
        dispatch(postsActions.createNewPost(postData))
        dispatch(postsActions.updatePublicationCount(publicationCount + 1))
      })

    dispatch(modalActions.setCloseModal({}))
    dispatch(postsActions.deletePhotosPost({}))
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
      nextContent={true}
      nextContentTitle={t.create.publication.publish}
      nextClick={onPublishHandler}
      contentBoxClassname={s.contentBox}
    >
      {iaActivePhoto && (
        <div className={s.modalContent}>
          <div className={s.lastPhoto}>
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
          <div className={s.postDescriptionBlock}>
            <div className={s.topContent}>
              <div className={s.photoBlock}>
                <Avatar userId={userId} className={s.photo} />
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
