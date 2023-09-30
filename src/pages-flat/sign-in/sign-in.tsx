import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import s from './sign-in.module.scss'

import { useLoginMutation, useMeQuery } from '@/features/auth/auth-api'
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

// type PropsType = {
//   onSubmit: (data: SignInFormShem) => void
// }
export const SignIn = () => {
  const [signIn] = useLoginMutation()
  const { data, isLoading } = useMeQuery()
  const router = useRouter()
  const { control, handleSubmit } = useForm<SignInFormShem>({
    defaultValues: {
      email: '',
      password: '',
    },
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
        toast.error(err.data.messages[0].message)
      })
  }

  const handleSubmitForm = handleSubmit(onSubmit)

  if (isLoading) return <div>...Loading</div>

  if (data) router.push('/')

  return (
    <Card className={s.signBlock}>
      <Typography className={s.title} variant={'large'}>
        Sign-in
      </Typography>
      <div className={s.gitAndGoogle}>
        <Button variant={'text'} className={s.clickToGitAndGoogle}>
          <GoogleIcon />
        </Button>
        <Button variant={'text'} className={s.clickToGitAndGoogle}>
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
          <Button as={'a'} variant={'text'} className={s.forgotPassword}>
            <Typography variant={'regular14'} className={s.forgotText}>
              Forgot Password
            </Typography>
          </Button>
        </div>
        <Button fullWidth={true} className={s.submit} type="submit">
          Sign in
        </Button>
      </form>
      <Typography variant={'regular16'} className={s.question}>
        Don&apos;t have have an account?
      </Typography>
      <Button variant={'text'} className={s.signUp}>
        <Link href={'/auth/sign-up'}>Sign Up</Link>
      </Button>
    </Card>
  )
}
