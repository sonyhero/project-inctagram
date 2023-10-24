import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  photos: [] as FormData[],
}

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setPhoto: (state, action: PayloadAction<FormData>) => {
      state.photos = [...state.photos, action.payload]
    },
  },
})

export const profileActions = profileSlice.actions
