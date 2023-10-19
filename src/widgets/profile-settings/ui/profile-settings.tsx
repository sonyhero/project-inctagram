import React, { useEffect, useMemo } from 'react'

import { useRouter } from 'next/router'

import s from './profile-settings.module.scss'

import { UpdateProfileForm } from '@/features/update-profile-form'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Button, TabSwitcher, Image } from '@/shared/ui'
import { profileSettingsSlice } from '@/widgets/profile-settings'

export const ProfileSettings = () => {
  const tabSwitcherOptions = useAppSelector(state => state.profileSettingsSlice.tabSwitcherOptions)
  const currentOption = useAppSelector(state => state.profileSettingsSlice.currentOption)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { locale } = useRouter()
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
    </div>
  )
}
