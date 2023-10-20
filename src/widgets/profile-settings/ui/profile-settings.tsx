import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/router'

import s from './profile-settings.module.scss'

import {
  useDeleteAvatarMutation,
  useGetProfileQuery,
  useUploadAvatarMutation,
} from '@/entities/profile'
import { UpdateProfileForm } from '@/features/update-profile-form'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import { Button, Close, Image, Modal, TabSwitcher, Typography } from '@/shared/ui'
import { profileSettingsSlice } from '@/widgets/profile-settings'

type PropsType = {
  userId: number
}
export const ProfileSettings: FC<PropsType> = ({ userId }) => {
  const tabSwitcherOptions = useAppSelector(state => state.profileSettingsSlice.tabSwitcherOptions)
  const currentOption = useAppSelector(state => state.profileSettingsSlice.currentOption)
  const { data: profileData } = useGetProfileQuery(userId)
  const [deletePhoto] = useDeleteAvatarMutation()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [photo, setPhoto] = useState<Nullable<FormData>>(null)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [updatePhoto] = useUploadAvatarMutation()
  const [errorPhoto, setErrorPhoto] = useState('')
  const handleTabSort = (value: string) => {
    dispatch(profileSettingsSlice.actions.setCurrentOption({ value }))
  }
  const openPhotoModal = () => {
    setOpenModal(true)
  }

  const openDeleteModalHandler = () => {
    setOpenDeleteModal(true)
  }
  const closeDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const deletePhotoHandler = () => {
    deletePhoto()
    setOpenDeleteModal(false)
  }

  const showActivePage = useMemo(() => {
    if (currentOption === t.myProfile.tabs.generalInformation) {
      return (
        <div className={s.profileSettings}>
          <div className={s.photoBlock}>
            {profileData?.avatars.length ? (
              <div className={s.photoAndDeleteBlock} onClick={openDeleteModalHandler}>
                <img src={profileData.avatars[0].url} className={s.photo} alt="profilePhoto" />
                <div className={s.deletePhoto}>
                  <Close />
                </div>
              </div>
            ) : (
              <div className={s.defaultPhoto}>
                <Image height={48} width={48} />
              </div>
            )}
            <Button variant={'outline'} onClick={openPhotoModal}>
              {t.myProfile.generalInformation.addAProfilePhoto}
            </Button>
          </div>
          {profileData ? <UpdateProfileForm defaultValue={profileData} /> : <div>Loading</div>}
        </div>
      )
    } else if (currentOption === t.myProfile.tabs.devices) {
      return <div>{t.myProfile.tabs.devices}</div>
    } else if (currentOption === t.myProfile.tabs.accountManagement) {
      return <div>{t.myProfile.tabs.accountManagement}</div>
    } else if (currentOption === t.myProfile.tabs.myPayments) {
      return <div>{t.myProfile.tabs.myPayments}</div>
    }
  }, [currentOption, profileData])

  const changeOptionTabSwitcher = useMemo(() => {
    return tabSwitcherOptions.map(el => {
      if (el.id === 1) {
        return { ...el, value: t.myProfile.tabs.generalInformation }
      }
      if (el.id === 2) {
        return { ...el, value: t.myProfile.tabs.devices }
      }
      if (el.id === 3) {
        return { ...el, value: t.myProfile.tabs.accountManagement }
      }
      if (el.id === 4) {
        return { ...el, value: t.myProfile.tabs.myPayments }
      }

      return el
    })
  }, [tabSwitcherOptions, t])

  useEffect(() => {
    dispatch(
      profileSettingsSlice.actions.setCurrentOption({
        value: t.myProfile.tabs.generalInformation,
      })
    )
  }, [locale])

  //TODO отпимизировать функцию
  const mainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const formData = new FormData()

      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(event.target.files[0].type)) {
        setErrorPhoto('Error! The format of the uploaded photo must be\n' + 'PNG and JPEG')
      } else if (event.target.files[0].size > 10 * 1024 * 1024) {
        setErrorPhoto('Error! Photo size must be less than 10 MB!')
      } else {
        setErrorPhoto('')
        formData.append('file', event.target.files[0])
        setPhoto(formData)
      }
    }
  }

  const onSaveHandler = () => {
    if (photo !== null) {
      updatePhoto(photo)
      setOpenModal(false)
      setPhoto(null)
    }
  }

  const onCloseModalHandler = () => {
    setErrorPhoto('')
    setOpenModal(false)
    setPhoto(null)
  }

  return (
    <div className={s.profileBlock}>
      <div className={s.tabSwitcher}>
        <TabSwitcher
          options={changeOptionTabSwitcher}
          onChangeCallback={value => handleTabSort(value)}
          activeTab={currentOption}
        />
      </div>
      {showActivePage}
      <Modal
        className={s.modalBlock}
        title={'Add a Profile Photo'}
        open={openModal}
        onClose={onCloseModalHandler}
      >
        {
          <div className={s.modalContent}>
            {errorPhoto && (
              <div className={s.modalError}>
                <Typography variant={'regular14'}>
                  Error! The format of the uploaded photo must be PNG and JPEG
                </Typography>
              </div>
            )}
            {photo ? (
              <img
                src={URL.createObjectURL(photo.get('file') as Blob)}
                className={s.avatar}
                alt="аватар"
              />
            ) : (
              <>
                <div className={s.modalImg}>
                  <Image height={48} width={48} />
                </div>
              </>
            )}
            {photo ? (
              <div className={s.savePhoto}>
                <Button variant={'primary'} onClick={onSaveHandler}>
                  Save
                </Button>
              </div>
            ) : (
              <label htmlFor={'mainPhotoInput'}>
                <Button as={'a'} variant={'primary'}>
                  Select from Computer
                </Button>
                <div>
                  <input
                    type={'file'}
                    id="mainPhotoInput"
                    onChange={mainPhotoSelected}
                    className={s.mainPhotoInput}
                  />
                </div>
              </label>
            )}
          </div>
        }
      </Modal>
      <Modal
        className={s.modalBlock}
        title={'Delete Photo'}
        open={openDeleteModal}
        titleFirstButton={'YES'}
        titleSecondButton={'NO'}
        onClose={closeDeleteModal}
        buttonBlockClassName={s.buttonBlock}
        callBack={deletePhotoHandler}
      >
        <Typography variant={'regular16'} className={s.description}>
          Are you sure you want to delete the photo?
        </Typography>
      </Modal>
    </div>
  )
}
