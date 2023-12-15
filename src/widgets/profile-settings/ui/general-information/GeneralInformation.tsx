import React, { useState } from 'react'

import s from './GeneralInformation.module.scss'

import { Avatar } from '@/entities'
import { useGetProfileQuery } from '@/entities/profile'
import { AddProfilePhotoModal, DeletePhotoModal } from '@/features/modal'
import { UpdateProfileForm } from '@/features/update-profile-form'
import { useTranslation } from '@/shared/hooks'
import { Button, Close, Typography } from '@/shared/ui'

type Props = {
  userId: number
}

export const GeneralInformation = ({ userId }: Props) => {
  const { data: profileData } = useGetProfileQuery(userId)
  const { t } = useTranslation()

  const [deletePhotoModal, setDeleteModalPhoto] = useState<boolean>(false)
  const [addPhotoModal, setAddPhotoModal] = useState<boolean>(false)

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
            <Avatar userId={userId} className={s.photo} />
            {profileData?.avatars[0]?.url && (
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
      <AddProfilePhotoModal addPhotoModal={addPhotoModal} setAddPhotoModal={setAddPhotoModal} />
      <DeletePhotoModal
        deletePhotoModal={deletePhotoModal}
        setDeleteModalPhoto={setDeleteModalPhoto}
      />
    </>
  )
}
