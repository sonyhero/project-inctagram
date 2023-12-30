import { ReactNode } from 'react'

import Link from 'next/link'

import s from './LinkButton.module.scss'

import { Button } from '@/shared/ui'

type Props = {
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  href: string
  className?: string
  children: ReactNode
}

export const LinkButton = (props: Props) => {
  const { variant = 'text', href, className, children } = props

  return (
    <Button className={className} variant={variant}>
      <Link href={href} className={s.link}>
        {children}
      </Link>
    </Button>
  )
}
