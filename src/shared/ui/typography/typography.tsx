import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  className?: string
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
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
  const { variant = 'regular16', className, as: Component = 'p', ...rest } = props

  return <Component className={`${s[variant]} ${className}`} {...rest} />
}
