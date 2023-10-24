export type ModalType = {
  open: NameModal | ''
}

export type NameModal =
  | 'logOut'
  | 'addPostModal'
  | 'addPostCroppingModal'
  | 'addPostFiltersModal'
  | 'addPostPublicationsModal'
  | 'closeAddPostModal'
