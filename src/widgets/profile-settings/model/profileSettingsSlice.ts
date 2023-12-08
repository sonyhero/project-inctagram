import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PATH } from '@/shared/config/routes'

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
      value: PATH.MY_PROFILE_SETTINGS_EDIT,
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
  currentOption: 'General information',
  showProfileSettings: false,
}

export const profileSettingsSlice = createSlice({
  name: 'profileSettingsSlice',
  initialState,
  reducers: {
    setCurrentOption: (state, action: PayloadAction<{ value: string }>) => {
      state.currentOption = action.payload.value
    },
    setShowProfileSettings: (state, action: PayloadAction<{ value: boolean }>) => {
      state.showProfileSettings = action.payload.value
    },
  },
})

export const { setShowProfileSettings, setCurrentOption } = profileSettingsSlice.actions
