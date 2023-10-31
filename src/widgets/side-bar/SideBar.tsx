import { useState } from 'react'

import s from './SideBar.module.scss'

import {
  AddPostCroppingModal,
  AddPostFilterModal,
  AddPostModal,
  LogoutModal,
  modalSlice,
} from '@/features/modal'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
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
import { profileSettingsSlice } from '@/widgets/profile-settings'
import { LinkSideBar } from '@/widgets/side-bar/link-side-bar/LinkSideBar'

export type VariantIconType =
  | typeof PATH.HOME
  | typeof PATH.CREATE
  | typeof PATH.MY_PROFILE
  | typeof PATH.MESSENGER
  | typeof PATH.SEARCH
  | typeof PATH.STATISTIC
  | typeof PATH.FAVORITES
  | typeof PATH.SIGN_IN

export const SideBar = () => {
  const [open, setOpen] = useState(false)
  const [variantIcon, setVariantIcon] = useState<Nullable<VariantIconType>>()
  const { t } = useTranslation()
  const modal = useAppSelector(state => state.modalSlice.open)
  const dispatch = useAppDispatch()
  const handleItemClick = (variant: Nullable<VariantIconType>) => {
    setVariantIcon(variant)
  }
  const logoutHandler = () => {
    setOpen(true)
  }

  const toMyProfileHandler = () => {
    handleItemClick(PATH.MY_PROFILE)
    dispatch(profileSettingsSlice.actions.setShowProfileSettings({ value: false }))
  }

  const createPostHandler = () => {
    dispatch(modalSlice.actions.setOpenModal('addPostModal'))
  }

  return (
    <>
      <div className={s.navbar}>
        <div className={s.mainBlock}>
          <LinkSideBar
            variantIcon={variantIcon}
            handleClick={() => handleItemClick(PATH.HOME)}
            nameLink={t.sidebar.home}
            link={PATH.HOME}
          >
            <Home
              outline={variantIcon !== PATH.HOME}
              color={variantIcon === PATH.HOME ? '#397df6' : 'white'}
            />
          </LinkSideBar>
          <LinkSideBar
            variantIcon={variantIcon}
            handleClick={createPostHandler}
            nameLink={t.sidebar.create}
            link={PATH.CREATE}
          >
            <PlusSquare
              outline={variantIcon !== PATH.CREATE}
              color={variantIcon === PATH.CREATE ? '#397df6' : 'white'}
            />
          </LinkSideBar>
          <LinkSideBar
            variantIcon={variantIcon}
            handleClick={toMyProfileHandler}
            nameLink={t.sidebar.myProfile}
            link={PATH.MY_PROFILE}
          >
            <Person
              outline={variantIcon !== PATH.MY_PROFILE}
              color={variantIcon === PATH.MY_PROFILE ? '#397df6' : 'white'}
            />
          </LinkSideBar>
          <LinkSideBar
            variantIcon={variantIcon}
            handleClick={() => handleItemClick(PATH.MESSENGER)}
            nameLink={t.sidebar.messenger}
            link={PATH.MESSENGER}
          >
            <MessageCircle
              outline={variantIcon !== PATH.MESSENGER}
              color={variantIcon === PATH.MESSENGER ? '#397df6' : 'white'}
            />
          </LinkSideBar>
          <LinkSideBar
            variantIcon={variantIcon}
            handleClick={() => handleItemClick(PATH.SEARCH)}
            nameLink={t.sidebar.search}
            link={PATH.SEARCH}
          >
            <Search color={variantIcon === PATH.SEARCH ? '#397df6' : 'white'} />
          </LinkSideBar>
        </div>
        <div className={s.secondaryBlock}>
          <LinkSideBar
            variantIcon={variantIcon}
            handleClick={() => handleItemClick(PATH.STATISTIC)}
            nameLink={t.sidebar.statistics}
            link={PATH.STATISTIC}
          >
            <TrendingUp color={variantIcon === PATH.STATISTIC ? '#397df6' : 'white'} />
          </LinkSideBar>
          <LinkSideBar
            variantIcon={variantIcon}
            handleClick={() => handleItemClick(PATH.FAVORITES)}
            nameLink={t.sidebar.favorites}
            link={PATH.FAVORITES}
          >
            <Bookmark
              outline={variantIcon !== PATH.FAVORITES}
              color={variantIcon === PATH.FAVORITES ? '#397df6' : 'white'}
            />
          </LinkSideBar>
        </div>
        <div className={s.container}>
          <Button className={s.logout} variant={'text'} onClick={logoutHandler}>
            <LogOut color={variantIcon === PATH.SIGN_IN ? '#397df6' : 'white'} />
            <Typography color={'primary'} variant={'medium14'}>
              {t.sidebar.logout}
            </Typography>
          </Button>
          <LogoutModal open={open} setOpen={setOpen} />
        </div>
      </div>
      <AddPostModal openAddPhotoModal={modal === 'addPostModal'} />
      <AddPostCroppingModal addPostCroppingModal={modal === 'addPostCroppingModal'} />
      <AddPostFilterModal addPostFilterModal={modal === 'addPostFilterModal'} />
    </>
  )
}
