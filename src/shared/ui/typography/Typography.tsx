import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './Typography.module.scss'

type Props<T extends ElementType = 'p'> = {
  as?: T
  className?: string
  color?: 'primary' | 'secondary' | 'error' | 'disabled' | 'linkColor'
  variant?:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'regular16'
    | 'bold16'
    | 'regular14'
    | 'medium14'
    | 'bold14'
    | 'small'
    | 'sb_small'
    | 'link'
    | 's_link'
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(
  props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>
) => {
  const { variant = 'regular16', color, className, as: Component = 'p', ...rest } = props

  return <Component className={`${s[variant]} ${className} ${s[color ?? '']}`} {...rest} />
}
