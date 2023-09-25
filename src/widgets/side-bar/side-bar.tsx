import { useState } from 'react'

import s from './side-bar.module.scss'

import { Home, Nullable, PlusSquare } from '@/shared'
import { LinkSideBar } from '@/widgets/side-bar/link-side-bar/link-side-bar'

export type VariantIconType =
  | 'home'
  | 'search'
  | 'my-profile'
  | 'create'
  | 'message'
  | 'logout'
  | 'favorites'

export const SideBar = () => {
  const [variantIcon, setVariantIcon] = useState<Nullable<VariantIconType>>()
  const handleItemClick = (variant: Nullable<VariantIconType>) => {
    setVariantIcon(variant)
  }

  return (
    <div className={s.navbar}>
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
      {/*<Link href={'/home'}>Home</Link>*/}
      {/*<Link href={'/create'}>Create</Link>*/}
      {/*<Link href={'/my-profile'}>My Profile</Link>*/}
      {/*<Link href={'/messenger'}>Messenger</Link>*/}
      {/*<Link href={'/search'}>Search</Link>*/}
      {/*<Link href={'/statistics'}>Statistics</Link>*/}
      {/*<Link href={'/favorites'}>Favorites</Link>*/}
    </div>
  )
}
