import { FC, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './forgot-password.module.scss'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ControlledTextField } from '@/shared/ui/controlled'
import { Recaptcha } from '@/shared/ui/recaptcha/recaptcha'
import { Typography } from '@/shared/ui/typography'

const sigInSchema = z.object({
  email: z.string().email(),
})

type SignInFormShem = z.infer<typeof sigInSchema>

type PropsType = {
  onSubmit: (data: SignInFormShem) => void
}
export const ForgotPassword: FC<PropsType> = ({ onSubmit }) => {
  const [recaptchaKey, setRecaptchaKey] = useState<string | null>(null)
  const { control, handleSubmit } = useForm<SignInFormShem>({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(sigInSchema),
  })
  const handleSubmitForm = handleSubmit(formData => {
    const dataWithRecaptcha = {
      ...formData,
      recaptcha: recaptchaKey,
    }

    onSubmit(dataWithRecaptcha)
  })
  const onRecaptchaChangeHandler = (key: string | null) => {
    setRecaptchaKey(key)
  }

  return (
    <Card className={s.forgotPasswordBlock}>
      <Typography className={s.title} variant={'large'}>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmitForm} className={s.formBlock}>
        <ControlledTextField
          name={'email'}
          label={'Email'}
          type={'default'}
          placeholder={'Epam@epam.com'}
          control={control}
          className={s.email}
        />
        <Typography variant={'regular14'} className={s.text}>
          Enter your email address and we will send you further instructions{' '}
        </Typography>
        <Button fullWidth={true} className={s.submit} type="submit">
          Send Link
        </Button>
        <Button variant={'text'} className={s.signUp}>
          <Link href={'/auth/sign-in'}>Back to Sign In</Link>
        </Button>
        <Recaptcha onRecaptchaChangeHandler={onRecaptchaChangeHandler} />
      </form>
    </Card>
  )
}
