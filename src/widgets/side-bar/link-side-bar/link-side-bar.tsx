import { FC, ReactNode } from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'

import s from './link-side-bar.module.scss'

import { Nullable, Typography } from '@/shared'
import { VariantIconType } from '@/widgets/side-bar'

type PropsType = {
  nameLink: string
  link?: VariantIconType
  children: ReactNode
  variantIcon?: Nullable<VariantIconType>
  handleClick: (variant: Nullable<VariantIconType>) => void
  className?: string
}

export const LinkSideBar: FC<PropsType> = ({
  nameLink,
  link,
  children,
  handleClick,
  variantIcon,
  className,
}) => {
  const handleItemClick = () => {
    handleClick(variantIcon!)
  }
  const styles = {
    // check: clsx(router.pathname == link ? s.active : ''),
    container: clsx(s.container, className),
    check: clsx(s.nameLink, link === variantIcon && s.active),
  }

  return (
    <div className={styles.container} onClick={handleItemClick}>
      {/*<div tabIndex={0} className={s.linkContainer}>*/}
      <Link tabIndex={1} href={`${link}`} className={s.link}>
        {children}
        <Typography variant={'regular14'} className={styles.check}>
          {nameLink}
        </Typography>
      </Link>
      {/*</div>*/}
    </div>
  )
}