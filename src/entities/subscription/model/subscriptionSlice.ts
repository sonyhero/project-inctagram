import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  paginationOptions: [{ value: 5 }, { value: 10 }, { value: 20 }, { value: 50 }, { value: 100 }],
  pageSize: 5,
  currentPage: 1,
}

export const subscriptionSlice = createSlice({
  name: 'subscriptionSlice',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload
    },
  },
})

export const { setPageSize, setCurrentPage } = subscriptionSlice.actions
