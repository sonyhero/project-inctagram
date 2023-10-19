import Image from 'next/image'
import Link from 'next/link'

import error from '../../../public/error.png'

import s from './error-page.module.scss'

import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Button, Typography } from '@/shared/ui'

export const ErrorPage = () => {
  const { t } = useTranslation()

  return (
    <div className={s.errorPage}>
      <Image src={error} alt={'error404'} />
      <Typography variant={'regular16'} className={s.errorMessage}>
        {t.auth.error404.pageNotFound}
      </Typography>
      <Button variant={'text'}>
        <Link href={'/'} className={s.toMain}>
          <Typography variant={'regular16'}>{t.auth.error404.backToMain}</Typography>
        </Link>
      </Button>
    </div>
  )
}
