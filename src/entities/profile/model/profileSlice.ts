import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Nullable } from '@/shared/types'

export type ProfileDataType = {
  email: Nullable<string>
  userId: Nullable<number>
  userName: Nullable<string>
}

const initialState = {
  profileData: {
    email: null,
    userId: null,
    userName: null,
  } as ProfileDataType,
}

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<ProfileDataType>) => {
      state.profileData = action.payload
    },
  },
})

export const profileActions = profileSlice.actions
