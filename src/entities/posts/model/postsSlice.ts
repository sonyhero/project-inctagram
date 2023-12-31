import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PostsResponseType } from '@/entities/posts/api'
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
const initialState = {
  photosPosts: [] as PostType[],
  post: null as Nullable<PostsResponseType>,
  posts: [] as PostsResponseType[],
  activeIndex: 0,
  publicationCount: 0,
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
    setPost: (state, action: PayloadAction<Nullable<PostsResponseType>>) => {
      state.post = action.payload
    },
    createNewPost: (state, action: PayloadAction<PostsResponseType>) => {
      state.posts.unshift(action.payload)
    },
    setPosts: (state, action: PayloadAction<Array<PostsResponseType>>) => {
      state.posts = [...action.payload]
    },
    deletePost: (state, action: PayloadAction<{ postId: number }>) => {
      state.posts = state.posts.filter(el => el.id !== action.payload.postId)
    },
    updatePost: (state, action: PayloadAction<{ description: string }>) => {
      if (state.post) {
        state.post.description = action.payload.description
      }
    },
    updatePublicationCount: (state, action: PayloadAction<number>) => {
      state.publicationCount = action.payload
    },
  },
})

export const postsActions = postsSlice.actions
