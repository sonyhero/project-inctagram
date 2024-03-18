import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PostsResponseType } from '@/entities/posts/api'

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
const initialState = {
  photosPosts: [] as PostType[],
  posts: [] as PostsResponseType[],
  activeIndex: 0,
}

export const postsSlice = createSlice({
  name: 'postsSlice',
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
    updateImgUrl: (state, action: PayloadAction<{ id: string; url: string }>) => {
      state.photosPosts = state.photosPosts.map(el =>
        el.id === action.payload.id ? { ...el, imageUrl: action.payload.url } : el
      )
    },
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload
    },
    deletePhotosPost: (state, _) => {
      state.photosPosts = []
    },
    createNewPost: (state, action: PayloadAction<PostsResponseType>) => {
      state.posts.unshift(action.payload)
    },
    setPosts: (state, action: PayloadAction<Array<PostsResponseType>>) => {
      state.posts = [...action.payload]
    },
    fetchScrollPosts: (state, action: PayloadAction<Array<PostsResponseType>>) => {
      state.posts = [...state.posts, ...action.payload]
    },
  },
})

export const postsActions = postsSlice.actions
