import { useState } from 'react'

import { useRouter } from 'next/router'

import { useGetLinks } from './hooks/useGetLinks'
import s from './SideBar.module.scss'

import {
  AddPostCroppingModal,
  AddPostFilterModal,
  AddPostModal,
  AddPostPublicationModal,
  ClosePostModal,
  DeletePostModal,
  LogoutModal,
} from '@/features/modal'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { useAppSelector } from '@/shared/store'
import { Button, LogOut, Typography } from '@/shared/ui'
import { LinkSideBar } from '@/widgets/side-bar/link-side-bar/LinkSideBar'

export const SideBar = () => {
  const [open, setOpen] = useState(false)
  const { pathname } = useRouter()
  const { t } = useTranslation()
  const { linksOptions } = useGetLinks()

  const modal = useAppSelector(state => state.modalSlice.open)
  const modalExtra = useAppSelector(state => state.modalSlice.openExtraModal)

  const logoutHandler = () => {
    setOpen(true)
  }

  const mappedLinks = linksOptions.map((item, index) => {
    return (
      <LinkSideBar key={index} {...item}>
        {item.icon}
      </LinkSideBar>
    )
  })

  return (
    <>
      <div className={s.navbar}>
        <div className={s.mainBlock}>
          <div className={s.primaryBlock}>{mappedLinks.slice(0, 5)}</div>
          <div className={s.secondaryBlock}>{mappedLinks.slice(5)}</div>
        </div>
        <Button className={s.logout} variant={'text'} onClick={logoutHandler}>
          <LogOut isActive={pathname === PATH.SIGN_IN} />
          <Typography color={'primary'} variant={'medium14'}>
            {t.sidebar.logout}
          </Typography>
        </Button>
      </div>
      <LogoutModal open={open} setOpen={setOpen} />
      {modal === 'addPostModal' && <AddPostModal openAddPhotoModal={modal === 'addPostModal'} />}
      {modal === 'addPostCroppingModal' && (
        <AddPostCroppingModal addPostCroppingModal={modal === 'addPostCroppingModal'} />
      )}
      <AddPostFilterModal addPostFilterModal={modal === 'addPostFilterModal'} />
      {modal === 'addPostPublicationsModal' && (
        <AddPostPublicationModal addPostPublicationModal={modal === 'addPostPublicationsModal'} />
      )}
      {modalExtra === 'closeAddPostModal' && (
        <ClosePostModal closeAddPostModal={modalExtra === 'closeAddPostModal'} />
      )}
      {modalExtra === 'deletePostModal' && (
        <DeletePostModal open={modalExtra === 'deletePostModal'} />
      )}
    </>
  )
}
