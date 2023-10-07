import Link from 'next/link'

import s from '@/components/layout/layout.module.scss'

export const Navbar = () => {
  return (
    <div className={s.navbar}>
      <Link href={'/accounts/forgot-password'}>forgot-password</Link>
      <Link href={'/accounts/sign-in'}>sign-in</Link>
      <Link href={'/accounts/sign-up'}>sign-up</Link>
      <Link href={'/'}>To main</Link>
    </div>
  )
}
