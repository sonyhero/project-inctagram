import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PATH } from '@/shared/config/routes'
import { SettingsPathValuesTypes } from '@/widgets/profile-settings/model/profileSettingsSlice.types'

const initialState = {
  tabSwitcherOptions: [
    {
      id: 1,
      value: PATH.MY_PROFILE_SETTINGS_GENERAL,
      description: 'General information',
      disabled: false,
    },
    { id: 2, value: PATH.MY_PROFILE_SETTINGS_DEVICES, description: 'Devices', disabled: false },
    {
      id: 3,
      value: PATH.MY_PROFILE_SETTINGS_ACCOUNT_MANAGEMENT,
      description: 'Account Management',
      disabled: false,
    },
    {
      id: 4,
      value: PATH.MY_PROFILE_SETTINGS_PAYMENTS,
      description: 'My payments',
      disabled: false,
    },
  ],
  currentOption: PATH.MY_PROFILE_SETTINGS_GENERAL,
}

export const profileSettingsSlice = createSlice({
  name: 'profileSettingsSlice',
  initialState,
  reducers: {
    setCurrentOption: (state, action: PayloadAction<{ value: SettingsPathValuesTypes }>) => {
      state.currentOption = action.payload.value
    },
  },
})

export const { setCurrentOption } = profileSettingsSlice.actions
