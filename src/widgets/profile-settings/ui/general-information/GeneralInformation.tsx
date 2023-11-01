import { useState } from 'react'

import Image from 'next/image'

import imageIcon from '../../../../../public/imageIcon.svg'

import s from './GeneralInformation.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { AddPhotoModal, DeletePhotoModal } from '@/features/modal'
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

  const profileAvatarLoader = () =>
    profileData && {
      loader: () => profileData.avatars[0].url,
      className: s.photo,
    }

  return (
    <>
      <div className={s.profileSettings}>
        <div className={s.photoBlock}>
          {profileData?.avatars.length ? (
            <div className={s.photoAndDeleteBlock}>
              <Image src={imageIcon} {...profileAvatarLoader()} alt={'profilePhoto'} />
              <div className={s.deletePhoto} onClick={openDeleteModalHandler}>
                <Close />
              </div>
            </div>
          ) : (
            <div className={s.defaultPhoto}>
              <Image src={imageIcon} alt={'profilePhoto'} />
            </div>
          )}
          <Button variant={'outline'} onClick={openPhotoModal}>
            <Typography className={s.addPhoto} variant={'h3'}>
              {t.myProfile.generalInformation.addAProfilePhoto}
            </Typography>
          </Button>
        </div>
        {profileData ? <UpdateProfileForm defaultValue={profileData} /> : <div>Loading</div>}
      </div>
      <AddPhotoModal addPhotoModal={addPhotoModal} setAddPhotoModal={setAddPhotoModal} />
      <DeletePhotoModal
        deletePhotoModal={deletePhotoModal}
        setDeleteModalPhoto={setDeleteModalPhoto}
      />
    </>
  )
}
