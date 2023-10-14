import React from 'react'

import { useMeQuery } from '@/features/auth/auth-api'
import { UpdateProfileForm } from '@/features/update-profile-form/UpdateProfileForm'
import { TabSwitcher } from '@/shared/ui/tabs'

export const MyProfile = () => {
  const { data, isLoading } = useMeQuery()
  const options = [
    { value: 'General information', disabled: false },
    { value: 'Devices', disabled: true },
    { value: 'Account Management', disabled: true },
    { value: 'My payments', disabled: true },
  ]

  return (
    <>
      <TabSwitcher options={options} />
      <UpdateProfileForm />
    </>
  )
}
