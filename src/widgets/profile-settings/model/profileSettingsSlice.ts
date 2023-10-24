import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  tabSwitcherOptions: [
    { id: 1, value: 'General information', disabled: false },
    { id: 2, value: 'Devices', disabled: false },
    { id: 3, value: 'Account Management', disabled: false },
    { id: 4, value: 'My payments', disabled: false },
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

export const profileSettingsActions = profileSettingsSlice.actions
