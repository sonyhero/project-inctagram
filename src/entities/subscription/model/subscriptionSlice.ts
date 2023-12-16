import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PaymentType = {
  token: string
  PayerID: string
}

const initialState = {
  paginationOptions: [{ value: 5 }, { value: 10 }, { value: 20 }, { value: 50 }, { value: 100 }],
  pageSize: 5,
  currentPage: 1,
  payment: {
    payPal: {
      token: '',
      PayerID: '',
    },
    isOpenModal: false,
    isSuccessPayPalPayment: false,
  },
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
    setPayment: (state, action: PayloadAction<PaymentType>) => {
      state.payment.payPal = action.payload
    },
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.payment.isOpenModal = action.payload
    },
    setIsSuccessPayment: (state, action: PayloadAction<boolean>) => {
      state.payment.isSuccessPayPalPayment = action.payload
    },
  },
})

export const { setPageSize, setCurrentPage, setPayment, setOpenModal, setIsSuccessPayment } =
  subscriptionSlice.actions
