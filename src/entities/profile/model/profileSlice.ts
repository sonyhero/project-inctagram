import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Nullable } from '@/shared/types'

export type SizeType = 'Оригинал' | '1:1' | '16:9' | '4:5'

export type PostType = {
  name: string
  type: string
  size: number
  imageUrl: string
  id: string
  zoom: number[]
  sizeScale: SizeType
  width: number
  height: number
  filter: string
}
export type ProfileDataType = {
  email: Nullable<string>
  userId: Nullable<number>
  userName: Nullable<string>
}

const initialState = {
  photos: [] as PostType[],
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
    setPhoto: (state, action: PayloadAction<PostType>) => {
      state.photos = [...state.photos, action.payload]
    },
    deletePhoto: (state, action: PayloadAction<{ id: string }>) => {
      state.photos = state.photos.filter(el => el.id !== action.payload.id)
    },
    updateZoom: (state, action: PayloadAction<{ id: string; zoom: number[] }>) => {
      state.photos = state.photos.map(el =>
        el.id === action.payload.id ? { ...el, zoom: action.payload.zoom } : el
      )
    },
    updateSize: (state, action: PayloadAction<{ id: string; sizeScale: SizeType }>) => {
      state.photos = state.photos.map(el =>
        el.id === action.payload.id ? { ...el, sizeScale: action.payload.sizeScale } : el
      )
    },
    updateWidthAndHeight: (
      state,
      action: PayloadAction<{ id: string; width: number; height: number }>
    ) => {
      state.photos = state.photos.map(el =>
        el.id === action.payload.id
          ? { ...el, width: action.payload.width, height: action.payload.height }
          : el
      )
    },
    updateFilter: (state, action: PayloadAction<{ id: string; filter: string }>) => {
      state.photos = state.photos.map(el =>
        el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el
      )
    },
    deletePhotos: (state, _) => {
      state.photos = []
    },
    updateUserData: (state, action: PayloadAction<ProfileDataType>) => {
      state.profileData = action.payload
    },
  },
})

export const profileActions = profileSlice.actions
