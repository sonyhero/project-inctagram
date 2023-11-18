import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Header.module.scss'

import { useMeQuery } from '@/features/auth'
import { LangSwitcher } from '@/features/lang-switcher'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Bell, Button, Typography } from '@/shared/ui'

export const Header = () => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const { data } = useMeQuery()

  const onSignInHandler = () => {
    push(PATH.SIGN_IN)
  }
  const onSignUpHandler = () => {
    push(PATH.SIGN_UP)
  }

  return (
    <header className={s.header}>
      <div className={`${s.container} ${data ? '' : s.unregisterContainer}`}>
        <Link href={PATH.HOME} className={s.home}>
          <Typography variant={'large'}>{t.header.inctagram}</Typography>
        </Link>
        <div className={s.rightBlock}>
          {data && <Bell />}
          <LangSwitcher />
          {!data && (
            <>
              <Button variant={'text'} onClick={onSignInHandler}>
                {t.header.logIn}
              </Button>
              <Button variant={'primary'} onClick={onSignUpHandler}>
                {t.header.signUp}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
