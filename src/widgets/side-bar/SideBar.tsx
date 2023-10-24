import { useState } from 'react'

import s from './SideBar.module.scss'

import { useTranslation } from '@/shared/hooks/useTranstaion'
import { useAppDispatch } from '@/shared/store'
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
import { LogoutModal } from 'src/features/modal/ui/logout-modal'

export type VariantIconType =
  | '/'
  | 'create'
  | 'my-profile'
  | 'messenger'
  | 'search'
  | 'statistics'
  | 'favorites'
  | 'logout'

export const SideBar = () => {
  const [open, setOpen] = useState(false)
  const [variantIcon, setVariantIcon] = useState<Nullable<VariantIconType>>()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const handleItemClick = (variant: Nullable<VariantIconType>) => {
    setVariantIcon(variant)
  }
  const logoutHandler = () => {
    setOpen(true)
  }

  const toMyProfileHandler = () => {
    handleItemClick('my-profile')
    dispatch(profileSettingsSlice.actions.setShowProfileSettings({ value: false }))
  }

  return (
    <div className={s.navbar}>
      <div className={s.mainBlock}>
        <LinkSideBar
          variantIcon={variantIcon}
          handleClick={() => handleItemClick('/')}
          nameLink={t.sidebar.home}
          link={'/'}
        >
          <Home outline={variantIcon !== '/'} color={variantIcon === '/' ? '#397df6' : 'white'} />
        </LinkSideBar>
        <LinkSideBar
          variantIcon={variantIcon}
          handleClick={() => handleItemClick('create')}
          nameLink={t.sidebar.create}
          link={'create'}
        >
          <PlusSquare
            outline={variantIcon !== 'create'}
            color={variantIcon === 'create' ? '#397df6' : 'white'}
          />
        </LinkSideBar>
        <LinkSideBar
          variantIcon={variantIcon}
          handleClick={toMyProfileHandler}
          nameLink={t.sidebar.myProfile}
          link={'my-profile'}
        >
          <Person
            outline={variantIcon !== 'my-profile'}
            color={variantIcon === 'my-profile' ? '#397df6' : 'white'}
          />
        </LinkSideBar>
        <LinkSideBar
          variantIcon={variantIcon}
          handleClick={() => handleItemClick('messenger')}
          nameLink={t.sidebar.messenger}
          link={'messenger'}
        >
          <MessageCircle
            outline={variantIcon !== 'messenger'}
            color={variantIcon === 'messenger' ? '#397df6' : 'white'}
          />
        </LinkSideBar>
        <LinkSideBar
          variantIcon={variantIcon}
          handleClick={() => handleItemClick('search')}
          nameLink={t.sidebar.search}
          link={'search'}
        >
          <Search color={variantIcon === 'search' ? '#397df6' : 'white'} />
        </LinkSideBar>
      </div>
      <div className={s.secondaryBlock}>
        <LinkSideBar
          variantIcon={variantIcon}
          handleClick={() => handleItemClick('statistics')}
          nameLink={t.sidebar.statistics}
          link={'statistics'}
        >
          <TrendingUp color={variantIcon === 'statistics' ? '#397df6' : 'white'} />
        </LinkSideBar>
        <LinkSideBar
          variantIcon={variantIcon}
          handleClick={() => handleItemClick('favorites')}
          nameLink={t.sidebar.favorites}
          link={'favorites'}
        >
          <Bookmark
            outline={variantIcon !== 'favorites'}
            color={variantIcon === 'favorites' ? '#397df6' : 'white'}
          />
        </LinkSideBar>
      </div>
      <div className={s.container}>
        <Button className={s.logout} variant={'text'} onClick={logoutHandler}>
          <LogOut color={variantIcon === 'logout' ? '#397df6' : 'white'} />
          <Typography color={'primary'} variant={'medium14'}>
            {t.sidebar.logout}
          </Typography>
        </Button>
        <LogoutModal open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}
