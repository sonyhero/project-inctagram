import { useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Congratulations.module.scss'

import { useVerificationEmailMutation } from '@/features/auth'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Button, CongratIcon, Typography } from '@/shared/ui'

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
      <Button variant={'primary'} className={s.signBtn}>
        <Link className={s.link} href={PATH.SIGN_IN}>
          <Typography variant={'h3'}>{t.auth.congratulations.signIn}</Typography>
        </Link>
      </Button>
      <CongratIcon className={s.pic} />
    </div>
  )
}
