import { useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Header.module.scss'

import { NotificationDropDown } from '@/entities'
import { useMeQuery } from '@/features/auth'
import { LangSwitcher } from '@/features/lang-switcher'
import { notificationsActions, useGetNotificationsQuery } from '@/features/notifications'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { useAppDispatch } from '@/shared/store'
import { Button, Typography } from '@/shared/ui'

export const Header = () => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const { data } = useMeQuery()
  const { data: notificationsData, isLoading } = useGetNotificationsQuery({
    pageSize: 30,
    sortDirection: 'desc',
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (notificationsData && !isLoading) {
      dispatch(notificationsActions.setNotifications(notificationsData.items))
    }
  }, [notificationsData, isLoading])
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
          {data && <NotificationDropDown />}
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
