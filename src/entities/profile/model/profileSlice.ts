import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GetAllPostsItems } from '@/entities/profile/api/postsApi.types'
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
  photosPosts: [] as PostType[],
  profileData: {
    email: null,
    userId: null,
    userName: null,
  } as ProfileDataType,
  post: null as Nullable<GetAllPostsItems>,
}

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setPhotoOfPost: (state, action: PayloadAction<PostType>) => {
      state.photosPosts = [...state.photosPosts, action.payload]
    },
    deletePhotoOfPost: (state, action: PayloadAction<{ id: string }>) => {
      state.photosPosts = state.photosPosts.filter(el => el.id !== action.payload.id)
    },
    updateZoom: (state, action: PayloadAction<{ id: string; zoom: number[] }>) => {
      state.photosPosts = state.photosPosts.map(el =>
        el.id === action.payload.id ? { ...el, zoom: action.payload.zoom } : el
      )
    },
    updateSize: (state, action: PayloadAction<{ id: string; sizeScale: SizeType }>) => {
      state.photosPosts = state.photosPosts.map(el =>
        el.id === action.payload.id ? { ...el, sizeScale: action.payload.sizeScale } : el
      )
    },
    updateWidthAndHeight: (
      state,
      action: PayloadAction<{ id: string; width: number; height: number }>
    ) => {
      state.photosPosts = state.photosPosts.map(el =>
        el.id === action.payload.id
          ? { ...el, width: action.payload.width, height: action.payload.height }
          : el
      )
    },
    updateFilter: (state, action: PayloadAction<{ id: string; filter: string }>) => {
      state.photosPosts = state.photosPosts.map(el =>
        el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el
      )
    },
    deletePhotosPost: (state, _) => {
      state.photosPosts = []
    },
    updateUserData: (state, action: PayloadAction<ProfileDataType>) => {
      state.profileData = action.payload
    },
    setPost: (state, action: PayloadAction<Nullable<GetAllPostsItems>>) => {
      state.post = action.payload
    },
  },
})

export const profileActions = profileSlice.actions
