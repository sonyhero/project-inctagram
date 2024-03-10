import { ReactNode } from 'react'

import { useRouter } from 'next/router'

import { useMeQuery } from '@/features/auth'
import { modalSlice } from '@/features/modal'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch } from '@/shared/store'
import { Bookmark, Home, MessageCircle, Person, PlusSquare, Search, TrendingUp } from '@/shared/ui'

type LinksOptionType = {
  link: string
  nameLink: string
  isActiveLink: boolean
  handleClick?: () => void
  icon: ReactNode
}

export const useGetLinks = () => {
  const { pathname, asPath } = useRouter()
  const { data } = useMeQuery()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const createPostHandler = () => {
    dispatch(modalSlice.actions.setOpenModal('addPostModal'))
  }

  const profilePath = asPath.match(/(\/[^/]+){2}/)?.[0]
  const myProfilePath = `${PATH.USER}/${data?.userId}`
  const isMyProfile = profilePath === myProfilePath

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

  return { linksOptions }
}
