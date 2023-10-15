import React, { useMemo } from 'react'

import s from './profile-settings.module.scss'

import { UpdateProfileForm } from '@/features/update-profile-form/UpdateProfileForm'
import { Button } from '@/shared'
import { TabSwitcher } from '@/shared/ui/tabs'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { profileSettingsSlice } from '@/widgets/profile-settings/model/profile-settings-slice'

export const ProfileSettings = () => {
  const tabSwitcherOptions = useAppSelector(state => state.profileSettingsSlice.tabSwitcherOptions)
  const currentOption = useAppSelector(state => state.profileSettingsSlice.currentOption)
  const dispatch = useAppDispatch()
  const handleTabSort = (value: string) => {
    dispatch(profileSettingsSlice.actions.setCurrentOption({ value }))
  }

  const showActivePage = useMemo(() => {
    if (currentOption === 'General information') {
      return (
        <div className={s.profileSettings}>
          <div className={s.photoBlock}>
            <div className={s.photo}></div>
            <Button variant={'outline'}>Add a Profile Photo</Button>
          </div>
          <UpdateProfileForm />
        </div>
      )
    } else if (currentOption === 'Devices') {
      return <div>Devices</div>
    } else if (currentOption === 'Account Management') {
      return <div>Account Management</div>
    } else {
      return <div>My payments</div>
    }
  }, [currentOption])

  return (
    <div className={s.profileBlock}>
      <div className={s.tabSwitcher}>
        <TabSwitcher
          options={tabSwitcherOptions}
          onChangeCallback={value => handleTabSort(value)}
          activeTab={currentOption}
        />
      </div>
      {showActivePage}
    </div>
  )
}
