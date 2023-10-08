import { configureStore } from '@reduxjs/toolkit'

import { modalSlice } from '@/features/modal/model/modal-slice'
import { baseApi } from '@/shared/api/base-api'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [modalSlice.name]: modalSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
