import React from 'react'

import { useMeQuery } from '@/features/auth/auth-api'
import { ProfileSettings } from '@/widgets/profile-settings/ui/profile-settings'

export const MyProfile = () => {
  const { data, isLoading } = useMeQuery()

  return (
    <>
      <ProfileSettings />
    </>
  )
}
