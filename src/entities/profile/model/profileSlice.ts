import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PostType = {
  id: string
  photo: FormData
}

const initialState = {
  photos: [] as PostType[],
}

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setPhoto: (state, action: PayloadAction<PostType>) => {
      state.photos = [...state.photos, action.payload]
    },
    deletePhoto: (state, action: PayloadAction<{ id: string }>) => {
      state.photos = state.photos.filter(el => el.id !== action.payload.id)
    },
  },
})

export const profileActions = profileSlice.actions
