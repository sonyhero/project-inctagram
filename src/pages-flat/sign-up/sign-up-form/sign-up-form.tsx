import { FC } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './sign-up-form.module.scss'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ControlledCheckbox, ControlledTextField } from '@/shared/ui/controlled'
import { GitIcon, GoogleIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

const sigInSchema = z
  .object({
    username: z.string().min(6).max(30),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    passwordConfirm: z.string().min(3),
    terms: z.boolean().default(false),
  })
  .refine(data => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'The passwords must match',
  })
  .refine(data => data.terms, {
    path: ['terms'],
    message: 'Confirm terms',
  })

export type SignInFormShem = z.infer<typeof sigInSchema>

type PropsType = {
  onSubmit: (data: SignInFormShem) => void
}

export const SignUpForm: FC<PropsType> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<SignInFormShem>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      terms: true,
    },
    resolver: zodResolver(sigInSchema),
  })

  const handleSubmitForm = handleSubmit(onSubmit)

  return (
    <Card className={s.signBlock}>
      <Typography className={s.title} variant="h1">
        Sign Up
      </Typography>
      <div className={s.iconsWrapper}>
        <GoogleIcon />
        <GitIcon />
      </div>
      <form onSubmit={handleSubmitForm}>
        <DevTool control={control} />
        <ControlledTextField
          className={s.username}
          control={control}
          type={'default'}
          name={'username'}
          label={'Username'}
          placeholder={'enter your username'}
        ></ControlledTextField>
        <ControlledTextField
          className={s.email}
          control={control}
          type={'default'}
          name={'email'}
          label={'Email'}
          placeholder={'enter your email'}
        ></ControlledTextField>
        <ControlledTextField
          className={s.password}
          control={control}
          type={'password'}
          name={'password'}
          label={'Password'}
          placeholder={'enter your password'}
        ></ControlledTextField>
        <ControlledTextField
          className={s.passwordConfirm}
          control={control}
          type={'password'}
          name={'passwordConfirm'}
          label={'Password confirmation'}
          placeholder={'enter your password again'}
        ></ControlledTextField>
        <div className={s.terms}>
          <ControlledCheckbox
            name={'terms'}
            control={control}
            defaultValue={true}
            label={
              <Typography variant={'small'}>
                I agree to the{' '}
                <Link href={'/accounts/terms-of-service'}>
                  <Typography className={s.link} as={'span'} variant={'s_link'}>
                    Terms of Service
                  </Typography>
                </Link>{' '}
                and{' '}
                <Link href={'/accounts/privacy-policy'}>
                  <Typography className={s.link} as={'span'} variant={'s_link'}>
                    Privacy Policy
                  </Typography>
                </Link>
              </Typography>
            }
          />
        </div>
        <Button className={s.signUpBtn} type={'submit'} fullWidth>
          Sign Up
        </Button>
      </form>
      <Typography className={s.subtitle} variant={'regular16'}>
        Do you have an account?
      </Typography>
      <Button variant={'text'}>Sign In</Button>
    </Card>
  )
}
