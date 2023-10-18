import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import s from './forgot-password-form.module.scss'

import { useRecoveryPasswordMutation } from '@/features/auth'
import { Button, Card, ControlledTextField, Modal, Recaptcha, Typography } from '@/shared/ui'

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

type ForgotPasswordFormShem = z.infer<typeof forgotPasswordSchema>

export const ForgotPasswordForm = () => {
  const [forgotPassword] = useRecoveryPasswordMutation()
  const [recaptchaKey, setRecaptchaKey] = useState<string | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [email, setEmail] = useState<string>('')
  const router = useRouter()
  const { control, handleSubmit } = useForm<ForgotPasswordFormShem>({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: ForgotPasswordFormShem) => {
    forgotPassword({ email: data.email, recaptcha: recaptchaKey })
      .unwrap()
      .then(() => {
        toast.success('Success')
        setOpenModal(true)
        setEmail(data.email)
      })
      .catch(err => {
        toast.error(err)
      })
  }
  const handleSubmitForm = handleSubmit(onSubmit)
  const onRecaptchaChangeHandler = (key: string | null) => {
    setRecaptchaKey(key)
  }
  const routerHandler = () => {
    router.push('/auth/sign-in')
  }

  return (
    <Card className={s.forgotPasswordBlock}>
      <Typography className={s.title} variant={'h1'}>
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
          <Link href={'/auth/sign-in'} className={s.backBtn}>
            Back to Sign In
          </Link>
        </Button>
        <Recaptcha onRecaptchaChangeHandler={onRecaptchaChangeHandler} />
      </form>
      <Modal
        title={'Email sent'}
        open={openModal}
        onClose={() => setOpenModal(false)}
        titleSecondButton={'OK'}
        buttonBlockClassName={s.buttonBlock}
        callBack={routerHandler}
      >
        We have sent a link to confirm your email to {email}
      </Modal>
    </Card>
  )
}
