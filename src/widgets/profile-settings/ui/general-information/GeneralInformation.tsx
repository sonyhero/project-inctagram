import React, { useState } from 'react'

import Image from 'next/image'

import s from './GeneralInformation.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { AddPhotoModal, DeletePhotoModal } from '@/features/modal'
import { UpdateProfileForm } from '@/features/update-profile-form'
import { useTranslation } from '@/shared/hooks'
import { Button, Close, Typography } from '@/shared/ui'
import imageIcon from 'public/imageIcon.svg'
import loader from 'public/loader.svg'

type Props = {
  userId: number
}

export const GeneralInformation = ({ userId }: Props) => {
  const { data: profileData, isFetching, isLoading } = useGetProfileQuery(userId)
  const { t } = useTranslation()

  const [deletePhotoModal, setDeleteModalPhoto] = useState<boolean>(false)
  const [addPhotoModal, setAddPhotoModal] = useState<boolean>(false)

  const isLoadingAvatar = isLoading && isFetching
  const avatar = profileData?.avatars.length && profileData.avatars[0].url
  const profilePhoto = isLoadingAvatar ? loader : avatar ?? imageIcon

  const openPhotoModal = () => {
    setAddPhotoModal(true)
  }
  const openDeleteModalHandler = () => {
    setDeleteModalPhoto(true)
  }

  return (
    <>
      <div className={s.profileSettings}>
        <div className={s.photoBlock}>
          <div className={s.photoAndDeleteBlock}>
            <Image
              src={profilePhoto}
              width={192}
              height={192}
              className={s.photo}
              alt={'profilePhoto'}
            />
            {profileData?.avatars.length && (
              <div className={s.deletePhoto} onClick={openDeleteModalHandler}>
                <Close />
              </div>
            )}
          </div>
          <Button variant={'outline'} onClick={openPhotoModal}>
            <Typography className={s.addPhoto} variant={'h3'}>
              {t.myProfile.generalInformation.addAProfilePhoto}
            </Typography>
          </Button>
        </div>
        <UpdateProfileForm defaultValue={profileData} />
      </div>
      <AddPhotoModal addPhotoModal={addPhotoModal} setAddPhotoModal={setAddPhotoModal} />
      <DeletePhotoModal
        deletePhotoModal={deletePhotoModal}
        setDeleteModalPhoto={setDeleteModalPhoto}
      />
    </>
  )
}
