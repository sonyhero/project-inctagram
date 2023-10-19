import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/router'

import s from './profile-settings.module.scss'

import { useGetProfileQuery, useUploadAvatarMutation } from '@/entities/profile'
import { useMeQuery } from '@/features/auth'
import { UpdateProfileForm } from '@/features/update-profile-form'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Button, TabSwitcher, Image, Modal, Typography } from '@/shared/ui'
import { profileSettingsSlice } from '@/widgets/profile-settings'

export const ProfileSettings = () => {
  const tabSwitcherOptions = useAppSelector(state => state.profileSettingsSlice.tabSwitcherOptions)
  const currentOption = useAppSelector(state => state.profileSettingsSlice.currentOption)
  const { data: meData } = useMeQuery()
  const { data } = useGetProfileQuery(meData!.userId)
  const [openModal, setOpenModal] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [updatePhoto] = useUploadAvatarMutation()
  const handleTabSort = (value: string) => {
    dispatch(profileSettingsSlice.actions.setCurrentOption({ value }))
  }

  const showActivePage = useMemo(() => {
    if (currentOption === t.myProfile.tabs.generalInformation) {
      return (
        <div className={s.profileSettings}>
          <div className={s.photoBlock}>
            <div className={s.photo}>
              <Image height={48} width={48} />
            </div>
            <Button variant={'outline'}>{t.myProfile.generalInformation.addAProfilePhoto}</Button>
          </div>
          <UpdateProfileForm />
        </div>
      )
    } else if (currentOption === t.myProfile.tabs.devices) {
      return <div>{t.myProfile.tabs.devices}</div>
    } else if (currentOption === t.myProfile.tabs.accountManagement) {
      return <div>{t.myProfile.tabs.accountManagement}</div>
    } else if (currentOption === t.myProfile.tabs.myPayments) {
      return <div>{t.myProfile.tabs.myPayments}</div>
    }
  }, [currentOption])

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
  const mainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const formData = new FormData()

      formData.append('avatar', event.target.files[0])
      updatePhoto(formData)
    }
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
        onClose={() => setOpenModal(false)}
      >
        {
          <div className={s.modalContent}>
            <div className={s.modalError}>
              <Typography variant={'regular14'}>
                Error! The format of the uploaded photo must be PNG and JPEG
              </Typography>
            </div>
            <div className={s.modalImg}>
              {data?.avatars.length ? (
                <img src={data?.avatars[0].url} alt="аватар" />
              ) : (
                <Image height={48} width={48} />
              )}
            </div>
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
          </div>
        }
      </Modal>
    </div>
  )
}
