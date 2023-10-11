import React from 'react'

import { useMeQuery } from '@/features/auth/auth-api'
import { UpdateProfileForm } from '@/features/update-profile-form/UpdateProfileForm'
import { Button, Typography } from '@/shared'
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
    <div>
      <div>
        <TabSwitcher options={options} />
      </div>
      <div>
        <UpdateProfileForm />
      </div>
      <div>
        <Button>
          <Typography variant={'h3'}>Save Changes</Typography>
        </Button>
      </div>
    </div>
  )
}
