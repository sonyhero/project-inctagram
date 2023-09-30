import { useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './congratulations.module.scss'

import { useVerificationEmailMutation } from '@/features/auth/auth-api'
import { Button } from '@/shared/ui/button'
import { CongratIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

export const Congratulations = () => {
  const [verification] = useVerificationEmailMutation()
  const router = useRouter()
  const query = router.query as { code: string; email: string }

  useEffect(() => {
    if (query.code) {
      verification({ confirmationCode: query.code })
    }
  }, [query.code])

  return (
    <div className={s.container}>
      <Typography variant={'h1'} className={s.headText}>
        Congratulations!
      </Typography>
      <Typography variant={'regular16'} className={s.description}>
        Your email has been confirmed
      </Typography>
      <Button variant={'primary'} className={s.signBtn}>
        <Link href={'/auth/sign-in'}>
          <Typography variant={'h3'}>Sign In</Typography>
        </Link>
      </Button>
      <CongratIcon className={s.pic} />
    </div>
  )
}
