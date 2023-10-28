import { ReactNode } from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'

import s from './LinkSideBar.module.scss'

import { PATH } from '@/shared/config/routes'
import { Nullable } from '@/shared/types'
import { Typography } from '@/shared/ui'
import { VariantIconType } from '@/widgets/side-bar'

type Props = {
  nameLink: string
  link?: string
  children: ReactNode
  variantIcon?: Nullable<VariantIconType>
  handleClick: (variant: Nullable<VariantIconType>) => void
  className?: string
  callBack?: () => void
}

export const LinkSideBar = (props: Props) => {
  const { nameLink, link, children, handleClick, variantIcon, className, callBack } = props

  const styles = {
    container: clsx(s.container, className),
    check: clsx(s.nameLink, link === variantIcon && s.active),
  }

  const handleItemClick = () => {
    callBack?.()
    handleClick(variantIcon!)
  }

  return (
    <div className={styles.container} onClick={handleItemClick}>
      {link === PATH.CREATE ? (
        <div className={s.link}>
          {children}
          <Typography color={'primary'} variant={'regular14'} className={styles.check}>
            {nameLink}
          </Typography>
        </div>
      ) : (
        <Link tabIndex={1} href={`${link}`} className={s.link}>
          {children}
          <Typography color={'primary'} variant={'regular14'} className={styles.check}>
            {nameLink}
          </Typography>
        </Link>
      )}
    </div>
  )
}
