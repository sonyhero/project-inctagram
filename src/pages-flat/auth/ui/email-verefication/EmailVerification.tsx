import s from './EmailVerification.module.scss'

import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Button, Typography, VereficationIcon } from '@/shared/ui'

export const EmailVerification = () => {
  const { t } = useTranslation()

  return (
    <div className={s.container}>
      <Typography variant={'h1'} className={s.headText}>
        {t.auth.badRecoveryLink.linkExpired}
      </Typography>

      <Typography variant={'regular16'} className={s.description}>
        {t.auth.badRecoveryLink.description}
      </Typography>

      <Button variant={'primary'} className={s.btn}>
        {t.auth.badRecoveryLink.resendLink}
      </Button>
      <VereficationIcon className={s.pic} />
    </div>
  )
}
