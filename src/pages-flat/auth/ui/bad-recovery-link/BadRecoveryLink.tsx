import React from 'react'

import Link from 'next/link'

import s from './BadRecoveryLink.module.scss'

import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Button, Typography, VereficationIcon } from '@/shared/ui'

export const BadRecoveryLink = () => {
  const { t } = useTranslation()

  return (
    <div className={s.container}>
      <Typography variant={'h1'} className={s.headText}>
        {t.auth.badRecoveryLink.linkExpired}
      </Typography>
      <Typography variant={'regular16'} className={s.description}>
        {t.auth.badRecoveryLink.description}
      </Typography>
      <Button variant={'primary'} className={s.signBtn}>
        <Link href={'/auth/forgot-password'}>
          <Typography variant={'h3'}>{t.auth.badRecoveryLink.resendLink}</Typography>
        </Link>
      </Button>
      <VereficationIcon className={s.pic} />
    </div>
  )
}
