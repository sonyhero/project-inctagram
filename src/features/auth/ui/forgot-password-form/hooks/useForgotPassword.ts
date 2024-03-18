import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useRecoveryPasswordMutation } from '@/features/auth'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks'
import { LocaleType } from '@/shared/locales'
import { Nullable } from '@/shared/types'

const getForgotPasswordSchema = (t: LocaleType) => {
  return z.object({
    email: z.string().email(t.zodSchema.email),
  })
}

type ForgotPasswordFormShem = z.infer<ReturnType<typeof getForgotPasswordSchema>>

export const useForgotPassword = () => {
  const [forgotPassword] = useRecoveryPasswordMutation()
  const [recaptchaKey, setRecaptchaKey] = useState<Nullable<string>>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const router = useRouter()
  const { t } = useTranslation()

  const forgotPasswordSchema = getForgotPasswordSchema(t)

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
        toast.success(t.toast.success)
        setOpenModal(true)
        setEmail(data.email)
      })
  }

  const handleSubmitForm = handleSubmit(onSubmit)
  const onRecaptchaChangeHandler = (key: Nullable<string>) => {
    setRecaptchaKey(key)
  }
  const routerHandler = () => {
    router.push(PATH.SIGN_IN)
  }
  const onCloseModalHandler = () => {
    setOpenModal(false)
  }
  const isDisableSendButton = !!recaptchaKey

  return {
    openModal,
    onCloseModalHandler,
    email,
    onRecaptchaChangeHandler,
    control,
    handleSubmitForm,
    routerHandler,
    isDisableSendButton,
  }
}
