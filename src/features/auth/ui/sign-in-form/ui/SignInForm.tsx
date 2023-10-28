import Link from 'next/link'

import s from './SignInForm.module.scss'

import { useSignIn } from '@/features/auth/ui/sign-in-form/hooks'
import { PATH } from '@/shared/config/routes'
import { useThirdPartyAuth } from '@/shared/hooks'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Button, Card, ControlledTextField, GitIcon, GoogleIcon, Typography } from '@/shared/ui'

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
          <Button variant={'text'} className={s.forgotPassword}>
            <Link className={s.forgotText} href={PATH.FORGOT_PASSWORD}>
              {t.auth.signIn.forgotPassword}
            </Link>
          </Button>
        </div>
        <Button fullWidth className={s.submit} type={'submit'} disabled={!isValid}>
          <Typography variant={'h3'}>{t.auth.signIn.signIn}</Typography>
        </Button>
      </form>
      <Typography variant={'regular16'} className={s.question}>
        {t.auth.signIn.question}
      </Typography>
      <Button variant={'text'}>
        <Link href={PATH.SIGN_UP} className={s.signUp}>
          <Typography variant={'h3'}>{t.auth.signIn.signUp}</Typography>
        </Link>
      </Button>
    </Card>
  )
}
