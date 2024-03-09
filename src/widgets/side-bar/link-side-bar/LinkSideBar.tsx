import { ReactNode } from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'

import s from './LinkSideBar.module.scss'

import { PATH } from '@/shared/config/routes'
import { Typography } from '@/shared/ui'

type Props = {
  nameLink: string
  link: string
  children: ReactNode
  isActiveLink: boolean
  handleClick?: () => void
  className?: string
}

export const LinkSideBar = (props: Props) => {
  const { nameLink, link, children, isActiveLink, className, handleClick } = props

  const styles = {
    container: clsx(s.container, className),
    check: clsx(s.nameLink, isActiveLink && s.active),
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      {link === PATH.CREATE ? (
        <div className={s.link}>
          {children}
          <Typography color={'primary'} variant={'regular14'} className={styles.check}>
            {nameLink}
          </Typography>
        </div>
      ) : (
        <Link tabIndex={1} href={link} className={s.link}>
          {children}
          <Typography color={'primary'} variant={'regular14'} className={styles.check}>
            {nameLink}
          </Typography>
        </Link>
      )}
    </div>
  )
}
