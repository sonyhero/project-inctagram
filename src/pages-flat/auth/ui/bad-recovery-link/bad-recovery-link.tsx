import React from 'react'

import Link from 'next/link'

import s from './bad-recovery-link.module.scss'

import { Button, Typography, VereficationIcon } from '@/shared/ui'

export const BadRecoveryLink = () => {
  return (
    <div className={s.container}>
      <Typography variant={'h1'} className={s.headText}>
        Email verification link expired
      </Typography>
      <Typography variant={'regular16'} className={s.description}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <Button variant={'primary'} className={s.signBtn}>
        <Link href={'/auth/forgot-password'}>
          <Typography variant={'h3'}>Resend link</Typography>
        </Link>
      </Button>
      <VereficationIcon className={s.pic} />
    </div>
  )
}
