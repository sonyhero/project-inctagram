import { FC, ReactNode } from 'react'

import s from './Card.module.scss'
type CardProps = {
  children: ReactNode
  className?: string
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return <div className={`${s.cardBlock} ${className}`}>{children}</div>
}
