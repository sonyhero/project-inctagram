import Image from 'next/image'
import Link from 'next/link'

import error from '../../../public/error.svg'

import s from './ErrorPage.module.scss'

import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Button, Typography } from '@/shared/ui'

export const ErrorPage = () => {
  const { t } = useTranslation()

  return (
    <div className={s.errorPage}>
      <Image src={error} alt={'error404'} className={s.errorImage} />
      <Typography variant={'regular16'} className={s.errorMessage}>
        {t.auth.error404.pageNotFound}
      </Typography>
      <Button variant={'text'}>
        <Link href={PATH.HOME} className={s.toMain}>
          <Typography variant={'regular16'}>{t.auth.error404.backToMain}</Typography>
        </Link>
      </Button>
    </div>
  )
}
