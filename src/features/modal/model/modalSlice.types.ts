export type ModalType = {
  open: NameModal | ''
}

export type NameModal =
  | 'logOut'
  | 'addPostModal'
  | 'addPostCroppingModal'
  | 'addPostFilterModal'
  | 'addPostPublicationsModal'
  | 'closeAddPostModal'
