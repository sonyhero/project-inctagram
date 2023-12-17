import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PaymentType = {
  token: string
  PayerID: string
}

const initialState = {
  accountTypeOptions: [
    { id: -1, value: 'Personal' },
    { id: -2, value: 'Business' },
  ],
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
    isSuccessStripePayment: false,
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
    setOpenPaymentModal: (state, action: PayloadAction<boolean>) => {
      state.payment.isOpenModal = action.payload
    },
    setIsSuccessPayPalPayment: (state, action: PayloadAction<boolean>) => {
      state.payment.isSuccessPayPalPayment = action.payload
    },
    setIsSuccessStripePayment: (state, action: PayloadAction<boolean>) => {
      state.payment.isSuccessStripePayment = action.payload
    },
  },
})

export const {
  setPageSize,
  setCurrentPage,
  setPayment,
  setOpenPaymentModal,
  setIsSuccessPayPalPayment,
  setIsSuccessStripePayment,
} = subscriptionSlice.actions
