import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import s from './ForgotPasswordForm.module.scss'

import { useRecoveryPasswordMutation } from '@/features/auth'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Nullable } from '@/shared/types'
import { Button, Card, ControlledTextField, Modal, Recaptcha, Typography } from '@/shared/ui'

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

type ForgotPasswordFormShem = z.infer<typeof forgotPasswordSchema>

export const ForgotPasswordForm = () => {
  const [forgotPassword] = useRecoveryPasswordMutation()
  const [recaptchaKey, setRecaptchaKey] = useState<Nullable<string>>(null)
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
  const { t } = useTranslation()

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
  const onRecaptchaChangeHandler = (key: Nullable<string>) => {
    setRecaptchaKey(key)
  }
  const routerHandler = () => {
    router.push('/auth/sign-in')
  }

  return (
    <Card className={s.forgotPasswordBlock}>
      <Typography className={s.title} variant={'h1'}>
        {t.auth.forgotPassword.forgotPassword}
      </Typography>
      <form onSubmit={handleSubmitForm} className={s.formBlock}>
        <ControlledTextField
          name={'email'}
          label={t.auth.forgotPassword.email}
          type={'default'}
          placeholder={'Epam@epam.com'}
          control={control}
          className={s.email}
        />
        <Typography variant={'regular14'} className={s.text}>
          {t.auth.forgotPassword.description}{' '}
        </Typography>
        <Button fullWidth={true} className={s.submit} type="submit">
          {t.auth.forgotPassword.sendLink}
        </Button>
        <Button variant={'text'} className={s.signUp}>
          <Link href={'/auth/sign-in'} className={s.backBtn}>
            {t.auth.forgotPassword.backToSignIn}
          </Link>
        </Button>
        <Recaptcha onRecaptchaChangeHandler={onRecaptchaChangeHandler} />
      </form>
      <Modal
        title={t.auth.forgotPassword.modal}
        open={openModal}
        onClose={() => setOpenModal(false)}
        titleSecondButton={'OK'}
        buttonBlockClassName={s.buttonBlock}
        callBack={routerHandler}
      >
        {t.auth.forgotPassword.modalDescription} {email}
      </Modal>
    </Card>
  )
}
