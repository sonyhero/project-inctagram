import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PostsResponseType } from '@/entities/posts/api'
import { Nullable } from '@/shared/types'

const initialState = {
  allPosts: [] as PostsResponseType[],
  lastUploadedPostId: null as Nullable<number>,
}

export const allPostsSlice = createSlice({
  name: 'allPostsSlice',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostsResponseType[]>) => {
      state.allPosts = [...action.payload]
    },
    fetchScrollPosts: (state, action: PayloadAction<PostsResponseType[]>) => {
      state.allPosts = [...state.allPosts, ...action.payload]
    },
    setLastUploadedPostId: (state, action: PayloadAction<Nullable<number>>) => {
      state.lastUploadedPostId = action.payload
    },
  },
})

export const allPostsActions = allPostsSlice.actions
