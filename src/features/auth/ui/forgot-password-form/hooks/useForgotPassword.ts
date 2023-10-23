import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useRecoveryPasswordMutation } from '@/features/auth'
import { Nullable } from '@/shared/types'

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

type ForgotPasswordFormShem = z.infer<typeof forgotPasswordSchema>

export const useForgotPassword = () => {
  const [forgotPassword] = useRecoveryPasswordMutation()
  const [recaptchaKey, setRecaptchaKey] = useState<Nullable<string>>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)
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
  const onRecaptchaChangeHandler = (key: Nullable<string>) => {
    setRecaptchaKey(key)
  }
  const routerHandler = () => {
    router.push('/auth/sign-in')
  }
  const onCloseModalHandler = () => {
    setOpenModal(false)
  }

  return {
    openModal,
    onCloseModalHandler,
    email,
    onRecaptchaChangeHandler,
    control,
    handleSubmitForm,
    routerHandler,
  }
}
