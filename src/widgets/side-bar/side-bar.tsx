import { useState } from 'react'

import s from './side-bar.module.scss'

import { useLogoutMutation } from '@/features/auth/auth-api'
import {
  Bookmark,
  Button,
  Home,
  LogOut,
  MessageCircle,
  Nullable,
  Person,
  PlusSquare,
  Search,
  TrendingUp,
  Typography,
} from '@/shared'
import { LinkSideBar } from '@/widgets/side-bar/link-side-bar/link-side-bar'

export type VariantIconType =
  | 'home'
  | 'create'
  | 'my-profile'
  | 'messenger'
  | 'search'
  | 'statistics'
  | 'favorites'
  | 'logout'

export const SideBar = () => {
  const [variantIcon, setVariantIcon] = useState<Nullable<VariantIconType>>()
  const handleItemClick = (variant: Nullable<VariantIconType>) => {
    setVariantIcon(variant)
  }

  const [logout] = useLogoutMutation()

  const logoutHandler = () => {
    logout()
    localStorage.removeItem('access')
  }

  return (
    <div className={s.navbar}>
      <div className={s.mainBlock}>
        <LinkSideBar
          variantIcon={variantIcon}
          handleClick={() => handleItemClick('home')}
          nameLink={'Home'}
          link={'home'}
        >
          <Home
            outline={variantIcon !== 'home'}
            color={variantIcon === 'home' ? '#397df6' : 'white'}
          />
        </LinkSideBar>
        <LinkSideBar
          variantIcon={variantIcon}
          handleClick={() => handleItemClick('create')}
          nameLink={'Create'}
          link={'create'}
        >
          <PlusSquare
            outline={variantIcon !== 'create'}
            color={variantIcon === 'create' ? '#397df6' : 'white'}
          />
        </LinkSideBar>
        <LinkSideBar
          variantIcon={variantIcon}
          handleClick={() => handleItemClick('my-profile')}
          nameLink={'My Profile'}
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
          nameLink={'Messenger'}
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
          nameLink={'Search'}
          link={'search'}
        >
          <Search color={variantIcon === 'search' ? '#397df6' : 'white'} />
        </LinkSideBar>
      </div>
      <div className={s.secondaryBlock}>
        <LinkSideBar
          variantIcon={variantIcon}
          handleClick={() => handleItemClick('statistics')}
          nameLink={'Statistics'}
          link={'statistics'}
        >
          <TrendingUp color={variantIcon === 'statistics' ? '#397df6' : 'white'} />
        </LinkSideBar>
        <LinkSideBar
          variantIcon={variantIcon}
          handleClick={() => handleItemClick('favorites')}
          nameLink={'Favorites'}
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
            Log Out
          </Typography>
        </Button>
      </div>
    </div>
  )
}
