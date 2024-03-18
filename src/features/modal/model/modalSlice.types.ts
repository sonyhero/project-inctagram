export type ModalType = {
  open: NameModal | ''
  openExtraModal: NameExtraModal | ''
}

export enum NameModal {
  logOut = 'logOut',
  addPostModal = 'addPostModal',
  addPostCroppingModal = 'addPostCroppingModal',
  addPostFilterModal = 'addPostFilterModal',
  addPostPublicationsModal = 'addPostPublicationsModal',
}

export enum NameExtraModal {
  closeAddPostModal = 'closeAddPostModal',
  deletePostModal = 'deletePostModal',
}
