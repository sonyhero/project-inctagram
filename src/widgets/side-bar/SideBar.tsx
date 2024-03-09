import { ReactNode, useState } from 'react'

import { useRouter } from 'next/router'

import s from './SideBar.module.scss'

import { useMeQuery } from '@/features/auth'
import {
  AddPostCroppingModal,
  AddPostFilterModal,
  AddPostModal,
  AddPostPublicationModal,
  ClosePostModal,
  DeletePostModal,
  LogoutModal,
  modalSlice,
} from '@/features/modal'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import {
  Bookmark,
  Button,
  Home,
  LogOut,
  MessageCircle,
  Person,
  PlusSquare,
  Search,
  TrendingUp,
  Typography,
} from '@/shared/ui'
import { LinkSideBar } from '@/widgets/side-bar/link-side-bar/LinkSideBar'

type LinksOptionType = {
  link: string
  nameLink: string
  isActiveLink: boolean
  handleClick?: () => void
  icon: ReactNode
}

export const SideBar = () => {
  const [open, setOpen] = useState(false)
  const { pathname, asPath } = useRouter()
  const { t } = useTranslation()
  const modal = useAppSelector(state => state.modalSlice.open)
  const modalExtra = useAppSelector(state => state.modalSlice.openExtraModal)
  const { data } = useMeQuery()
  const dispatch = useAppDispatch()

  const profilePath = asPath.match(/(\/[^/]+){2}/)?.[0]
  const myProfilePath = `${PATH.USER}/${data?.userId}`
  const isMyProfile = profilePath === myProfilePath

  const logoutHandler = () => {
    setOpen(true)
  }

  const createPostHandler = () => {
    dispatch(modalSlice.actions.setOpenModal('addPostModal'))
  }

  if (!data) {
    return
  }

  const linksOptions: LinksOptionType[] = [
    {
      link: PATH.HOME,
      nameLink: t.sidebar.home,
      isActiveLink: pathname === PATH.HOME,
      icon: <Home isActive={pathname === PATH.HOME} />,
    },
    {
      link: PATH.CREATE,
      nameLink: t.sidebar.create,
      isActiveLink: pathname === PATH.CREATE,
      icon: <PlusSquare isActive={pathname === PATH.CREATE} />,
      handleClick: createPostHandler,
    },
    {
      link: `${PATH.USER}/${data?.userId}`,
      nameLink: t.sidebar.myProfile,
      isActiveLink: isMyProfile,
      icon: <Person isActive={isMyProfile} />,
    },
    {
      link: PATH.MESSENGER,
      nameLink: t.sidebar.messenger,
      isActiveLink: pathname === PATH.MESSENGER,
      icon: <MessageCircle isActive={pathname === PATH.MESSENGER} />,
    },
    {
      link: PATH.SEARCH,
      nameLink: t.sidebar.search,
      isActiveLink: pathname === PATH.SEARCH,
      icon: <Search isActive={pathname === PATH.SEARCH} />,
    },
    {
      link: PATH.STATISTIC,
      nameLink: t.sidebar.statistics,
      isActiveLink: pathname === PATH.STATISTIC,
      icon: <TrendingUp isActive={pathname === PATH.STATISTIC} />,
    },
    {
      link: PATH.FAVORITES,
      nameLink: t.sidebar.favorites,
      isActiveLink: pathname === PATH.FAVORITES,
      icon: <Bookmark isActive={pathname === PATH.FAVORITES} />,
    },
  ]

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
