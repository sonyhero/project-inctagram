import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ModalType, NameModal } from '@/features/modal'

const initialState: ModalType = {
  open: '',
}

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<NameModal>) => {
      state.open = action.payload
    },
    setCloseModal: (state, _) => {
      state.open = ''
    },
  },
})

export const modalActions = modalSlice.actions
