import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { postsSlice } from '@/entities/posts'
import { publicPostsSlice } from '@/entities/public-posts'
import { subscriptionSlice } from '@/entities/subscription/model/subscriptionSlice'
import { modalSlice } from '@/features/modal/model/modalSlice'
import { notificationsSlice } from '@/features/notifications'
import { baseApi } from '@/shared/api/baseApi'
import { profileSettingsSlice } from '@/widgets/profile-settings/model/profileSettingsSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [modalSlice.name]: modalSlice.reducer,
    [profileSettingsSlice.name]: profileSettingsSlice.reducer,
    [postsSlice.name]: postsSlice.reducer,
    [subscriptionSlice.name]: subscriptionSlice.reducer,
    [publicPostsSlice.name]: publicPostsSlice.reducer,
    [notificationsSlice.name]: notificationsSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

const makeStore = () => store

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })
