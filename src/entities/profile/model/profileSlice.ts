import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SizeType = 'Оригинал' | '1:1' | '16:9' | '4:5'

export type PostType = {
  id: string
  photo: FormData
  zoom: number[]
  size: SizeType
  width: number
  height: number
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
    updateZoom: (state, action: PayloadAction<{ id: string; zoom: number[] }>) => {
      state.photos = state.photos.map(el =>
        el.id === action.payload.id ? { ...el, zoom: action.payload.zoom } : el
      )
    },
    updateSize: (state, action: PayloadAction<{ id: string; size: SizeType }>) => {
      state.photos = state.photos.map(el =>
        el.id === action.payload.id ? { ...el, size: action.payload.size } : el
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
  },
})

export const profileActions = profileSlice.actions
