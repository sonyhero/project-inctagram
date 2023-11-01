import Link from 'next/link'

import s from './Header.module.scss'

import { LangSwitcher } from '@/features/lang-switcher'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Bell, Typography } from '@/shared/ui'

export const Header = () => {
  const { t } = useTranslation()

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link href={PATH.HOME} className={s.home}>
          <Typography variant={'large'}>{t.header.inctagram}</Typography>
        </Link>
        <div className={s.rightBlock}>
          <Bell />
          <LangSwitcher />
        </div>
      </div>
    </header>
  )
}
