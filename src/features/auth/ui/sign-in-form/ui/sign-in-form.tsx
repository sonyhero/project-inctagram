import Link from 'next/link'

import s from './sign-in-form.module.scss'

import { useSignIn } from '@/features/auth/ui/sign-in-form/hooks'
import { useThirdPartyAuth } from '@/shared/hooks'
import { Button, Card, ControlledTextField, GitIcon, GoogleIcon, Typography } from '@/shared/ui'

export const SignInForm = () => {
  const { onGitHubAuth, onGoogleAuth } = useThirdPartyAuth()
  const { control, handleSubmitForm, isValid } = useSignIn()

  return (
    <Card className={s.signBlock}>
      <Typography className={s.title} variant={'h1'}>
        Sign In
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
          label={'Email'}
          type={'default'}
          placeholder={'Epam@epam.com'}
          control={control}
          className={s.email}
        />
        <ControlledTextField
          name={'password'}
          label={'Password'}
          type={'password'}
          placeholder={'enter your password'}
          control={control}
          className={s.password}
          autoComplete={'on'}
        />
        <div className={s.forgotWrapper}>
          <Button variant={'text'} className={s.forgotPassword}>
            <Link className={s.forgotText} href={'/auth/forgot-password'}>
              Forgot password
            </Link>
          </Button>
        </div>
        <Button fullWidth className={s.submit} type="submit" disabled={!isValid}>
          <Typography variant={'h3'}>Sign In</Typography>
        </Button>
      </form>
      <Typography variant={'regular16'} className={s.question}>
        Don&apos;t have have an account?
      </Typography>
      <Button variant={'text'}>
        <Link href={'/auth/sign-up'} className={s.signUp}>
          <Typography>Sign Up</Typography>
        </Link>
      </Button>
    </Card>
  )
}
