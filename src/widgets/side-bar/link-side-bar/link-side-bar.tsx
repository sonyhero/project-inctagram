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
  callBack?: () => void
}

export const LinkSideBar: FC<PropsType> = ({
  nameLink,
  link,
  children,
  handleClick,
  variantIcon,
  className,
  callBack,
}) => {
  const handleItemClick = () => {
    callBack?.()
    handleClick(variantIcon!)
  }
  const styles = {
    container: clsx(s.container, className),
    check: clsx(s.nameLink, link === variantIcon && s.active),
  }

  return (
    <div className={styles.container} onClick={handleItemClick}>
      <Link tabIndex={1} href={`${link}`} className={s.link}>
        {children}
        <Typography color={'primary'} variant={'regular14'} className={styles.check}>
          {nameLink}
        </Typography>
      </Link>
    </div>
  )
}
