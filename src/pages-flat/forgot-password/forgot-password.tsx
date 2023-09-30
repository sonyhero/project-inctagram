import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './forgot-password.module.scss'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ControlledTextField } from '@/shared/ui/controlled'
import { Typography } from '@/shared/ui/typography'

const sigInSchema = z.object({
  email: z.string().email(),
})

type SignInFormShem = z.infer<typeof sigInSchema>

export const ForgotPassword = () => {
  const { control, handleSubmit } = useForm<SignInFormShem>({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(sigInSchema),
  })

  const onSubmit = (data: SignInFormShem) => {
    console.log(data)
  }

  const handleSubmitForm = handleSubmit(onSubmit)

  return (
    <Card className={s.signBlock}>
      <Typography className={s.title} variant={'large'}>
        Forgot password
      </Typography>
      <form onSubmit={handleSubmitForm}>
        <ControlledTextField
          name={'email'}
          label={'Email'}
          type={'default'}
          placeholder={'Epam@epam.com'}
          control={control}
          className={s.email}
        />
        <Button fullWidth={true} className={s.submit} type="submit">
          Send Link
        </Button>
      </form>
      <Button variant={'text'} className={s.signUp}>
        <Link href={'/auth/sign-in'}>Back to Sign In</Link>
      </Button>
    </Card>
  )
}
