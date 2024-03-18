import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ModalType, NameExtraModal, NameModal } from '@/features/modal'

const initialState: ModalType = {
  open: '',
  openExtraModal: '',
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
    setOpenExtraModal: (state, action: PayloadAction<NameExtraModal>) => {
      state.openExtraModal = action.payload
    },
    setCloseExtraModal: (state, _) => {
      state.openExtraModal = ''
    },
  },
})

export const modalActions = modalSlice.actions
