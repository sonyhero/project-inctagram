import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './sign-in.module.scss'

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

type PropsType = {
  onSubmit: (data: SignInFormShem) => void
}
export const SignIn: FC<PropsType> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<SignInFormShem>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(sigInSchema),
  })
  const handleSubmitForm = handleSubmit(onSubmit)

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
      <Button as={'a'} variant={'text'} className={s.signUp}>
        Sign Up
      </Button>
    </Card>
  )
}
