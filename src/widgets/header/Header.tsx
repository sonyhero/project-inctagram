import s from './Header.module.scss'

import { LangSwitcher } from '@/features/lang-switcher'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Bell, Typography } from '@/shared/ui'

export const Header = () => {
  const { t } = useTranslation()

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Typography variant={'large'}>{t.header.inctagram}</Typography>
        <div className={s.rightBlock}>
          <Bell />
          <LangSwitcher />
        </div>
      </div>
    </header>
  )
}
