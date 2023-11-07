import Link from 'next/link'

import s from './SignInForm.module.scss'

import { useSignIn } from '@/features/auth/ui/sign-in-form/hooks'
import { PATH } from '@/shared/config/routes'
import { useThirdPartyAuth } from '@/shared/hooks'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Button, Card, ControlledTextField, GitIcon, GoogleIcon, Typography } from '@/shared/ui'
import { LinkButton } from '@/shared/ui/link-button/LinkButton'

export const SignInForm = () => {
  const { onGitHubAuth, onGoogleAuth } = useThirdPartyAuth()
  const { control, handleSubmitForm, isValid } = useSignIn()
  const { t } = useTranslation()

  return (
    <Card className={s.signBlock}>
      <Typography className={s.title} variant={'h1'}>
        {t.auth.signIn.signIn}
      </Typography>
      <div className={s.gitAndGoogle}>
        <Button variant={'text'} className={s.clickToGitAndGoogle} onClick={onGoogleAuth}>
          <GoogleIcon />
        </Button>
        <Button variant={'text'} className={s.clickToGitAndGoogle} onClick={onGitHubAuth}>
          <GitIcon />
        </Button>
      </div>
      <form onSubmit={handleSubmitForm}>
        <ControlledTextField
          name={'email'}
          label={t.auth.signIn.email}
          type={'default'}
          placeholder={'Epam@epam.com'}
          control={control}
          className={s.email}
        />
        <ControlledTextField
          name={'password'}
          label={t.auth.signIn.password}
          type={'password'}
          placeholder={t.auth.signIn.passwordPlaceholder}
          control={control}
          className={s.password}
          autoComplete={'on'}
        />
        <div className={s.forgotWrapper}>
          <Link className={s.link} href={PATH.FORGOT_PASSWORD}>
            <Typography variant={'regular14'}>{t.auth.signIn.forgotPassword}</Typography>
          </Link>
        </div>
        <Button fullWidth className={s.submit} type={'submit'} disabled={!isValid}>
          {t.auth.signIn.signIn}
        </Button>
      </form>
      <Typography variant={'regular16'} className={s.question}>
        {t.auth.signIn.question}
      </Typography>
      <LinkButton href={PATH.SIGN_UP}>{t.auth.signIn.signUp}</LinkButton>
    </Card>
  )
}
