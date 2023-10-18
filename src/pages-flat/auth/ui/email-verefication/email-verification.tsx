import s from './email-verification.module.scss'

import { Button, Typography, VereficationIcon } from '@/shared/ui'

export const EmailVerification = () => {
  return (
    <div className={s.container}>
      <Typography variant={'h1'} className={s.headText}>
        Email verification link expired
      </Typography>

      <Typography variant={'regular16'} className={s.description}>
        Looks like the verification link has
        <br />
        expired. Not to worry, we can send the
        <br />
        link again
      </Typography>

      <Button variant={'primary'} className={s.btn}>
        <Typography variant={'h3'}>Resend verification link</Typography>
      </Button>
      <VereficationIcon className={s.pic} />
    </div>
  )
}
