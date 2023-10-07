import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleLogin } from '@react-oauth/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import s from './sign-in.module.scss'

import { useGoogleLoginMutation, useLoginMutation } from '@/features/auth/auth-api'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ControlledTextField } from '@/shared/ui/controlled'
import { GitIcon, GoogleIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

const sigInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})

type SignInFormShem = z.infer<typeof sigInSchema>

export const SignIn = () => {
  const [signIn] = useLoginMutation()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid },
  } = useForm<SignInFormShem>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(sigInSchema),
  })

  const onSubmit = (data: SignInFormShem) => {
    signIn(data)
      .unwrap()
      .then(res => {
        localStorage.setItem('access', res.accessToken)
        router.push('/')
        toast.success('Success')
      })
      .catch(err => {
        setError('password', {
          type: 'server',
          message: err.data.messages,
        })
      })
  }

  const handleSubmitForm = handleSubmit(onSubmit)

  const [googleLogin] = useGoogleLoginMutation()

  const onGoogleAuth = useGoogleLogin({
    onSuccess: codeResponse => {
      googleLogin({ code: codeResponse.code })
        .unwrap()
        .then(res => {
          localStorage.setItem('access', res.accessToken)
          router.push('/')
          toast.success('Success')
        })
    },
    flow: 'auth-code',
  })

  const gitHubHandler = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login')
  }

  return (
    <Card className={s.signBlock}>
      <Typography className={s.title} variant={'h1'}>
        Sign In
      </Typography>
      <div className={s.gitAndGoogle}>
        <Button variant={'text'} className={s.clickToGitAndGoogle} onClick={onGoogleAuth}>
          <GoogleIcon />
        </Button>
        <Button variant={'text'} className={s.clickToGitAndGoogle} onClick={gitHubHandler}>
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
