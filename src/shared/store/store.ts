import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { modalSlice } from '@/features/modal/model/modalSlice'
import { baseApi } from '@/shared/api/baseApi'
import { profileSettingsSlice } from '@/widgets/profile-settings/model/profileSettingsSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [modalSlice.name]: modalSlice.reducer,
    [profileSettingsSlice.name]: profileSettingsSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
