import s from './BadRecoveryLink.module.scss'

import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Typography, VereficationIcon } from '@/shared/ui'
import { LinkButton } from '@/shared/ui/link-button/LinkButton'

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
      <LinkButton variant={'primary'} className={s.link} href={PATH.FORGOT_PASSWORD}>
        {t.auth.badRecoveryLink.resendLink}
      </LinkButton>
      <VereficationIcon className={s.pic} />
    </div>
  )
}
