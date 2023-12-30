import { useEffect } from 'react'

import { useRouter } from 'next/router'

import s from './Congratulations.module.scss'

import { useVerificationEmailMutation } from '@/features/auth'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { CongratIcon, Typography } from '@/shared/ui'
import { LinkButton } from '@/shared/ui/link-button/LinkButton'

export const Congratulations = () => {
  const [verification] = useVerificationEmailMutation()
  const router = useRouter()
  const query = router.query as { code: string; email: string }

  const { t } = useTranslation()

  useEffect(() => {
    if (query.code) {
      verification({ confirmationCode: query.code })
    }
  }, [query.code])

  return (
    <div className={s.container}>
      <Typography variant={'h1'} className={s.headText}>
        {t.auth.congratulations.congratulations}
      </Typography>
      <Typography variant={'regular16'} className={s.description}>
        {t.auth.congratulations.description}
      </Typography>
      <LinkButton variant={'primary'} className={s.link} href={PATH.SIGN_IN}>
        {t.auth.congratulations.signIn}
      </LinkButton>
      <CongratIcon className={s.pic} />
    </div>
  )
}
