import Image from 'next/image'

import error from '../../../public/error.svg'

import s from './ErrorPage.module.scss'

import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Typography } from '@/shared/ui'
import { LinkButton } from '@/shared/ui/link-button/LinkButton'

export const ErrorPage = () => {
  const { t } = useTranslation()

  return (
    <div className={s.errorPage}>
      <Image src={error} priority={true} alt={'error404'} />
      <Typography variant={'regular16'} className={s.errorMessage}>
        {t.auth.error404.pageNotFound}
      </Typography>
      <LinkButton href={PATH.HOME}>{t.auth.error404.backToMain}</LinkButton>
    </div>
  )
}
