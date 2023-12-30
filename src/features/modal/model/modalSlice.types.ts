export type ModalType = {
  open: NameModal | ''
  openExtraModal: NameExtraModal | ''
}

export type NameModal =
  | 'logOut'
  | 'addPostModal'
  | 'addPostCroppingModal'
  | 'addPostFilterModal'
  | 'addPostPublicationsModal'
  | 'viewPostModal'

export type NameExtraModal = 'closeAddPostModal' | 'deletePostModal'
