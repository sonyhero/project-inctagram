import { FC, ReactNode } from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'

import s from './link-side-bar.module.scss'

import { Nullable, Typography, VariantIconType } from '@/shared'

type PropsType = {
  nameLink: string
  link?: VariantIconType
  children: ReactNode
  variantIcon?: Nullable<VariantIconType>
  handleClick: (variant: Nullable<VariantIconType>) => void
}

export const LinkSideBar: FC<PropsType> = ({
  nameLink,
  link,
  children,
  handleClick,
  variantIcon,
}) => {
  const handleItemClick = () => {
    handleClick(variantIcon!)
  }
  const styles = {
    // check: clsx(router.pathname == link ? s.active : ''),
    check: clsx(s.unActive, link === variantIcon && s.active),
  }

  return (
    <div className={s.container} onClick={handleItemClick}>
      <div tabIndex={0} className={s.linkContainer}>
        {children}
        <Link tabIndex={1} href={`${link}`} className={s.link}>
          <Typography variant={'regular14'} className={styles.check}>
            {nameLink}
          </Typography>
        </Link>
      </div>
    </div>
  )
}
