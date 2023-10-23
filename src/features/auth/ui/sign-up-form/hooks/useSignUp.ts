import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useSignUpMutation } from '@/features/auth/api/authApi'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { LocaleType } from '@/shared/locales'

const getSigUpSchema = (t: LocaleType) => {
  return z
    .object({
      userName: z
        .string()
        .min(6, `${t.auth.signUp.zodSigUpSchema.userNameMin} 6`)
        .max(30, `${t.auth.signUp.zodSigUpSchema.userNameMax} 30`)
        .regex(/^[a-zA-Z0-9_-]*$/),
      email: z.string().email(t.auth.signUp.zodSigUpSchema.email),
      password: z
        .string()
        .min(6, `${t.auth.signUp.zodSigUpSchema.passwordMin} 6`)
        .max(20, `${t.auth.signUp.zodSigUpSchema.passwordMax} 20`)
        .regex(
          /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/,
          `${t.auth.signUp.zodSigUpSchema.passwordRegex} a-z, A-Z,  ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _\` { | } ~`
        ),
      passwordConfirm: z.string(),
      terms: z.boolean().default(false),
    })
    .refine(data => data.password === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: t.auth.signUp.zodSigUpSchema.passwordRefine,
    })
    .refine(data => data.terms, {
      path: ['terms'],
      message: t.auth.signUp.zodSigUpSchema.termsConfirm,
    })
}

export type SignUpFormShem = z.infer<ReturnType<typeof getSigUpSchema>>

export const useSignUp = () => {
  const [signUp] = useSignUpMutation()
  const [emailModal, setEmailModal] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { t } = useTranslation()

  const sigUpSchema = getSigUpSchema(t)

  const {
    control,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { isValid },
  } = useForm<SignUpFormShem>({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      terms: false,
    },
    mode: 'onBlur',
    resolver: zodResolver(sigUpSchema),
  })

  const watchCheckbox = watch('terms')
  const disableButton = !isValid || !watchCheckbox

  const onSubmit = (data: SignUpFormShem) => {
    signUp({ userName: data.userName, email: data.email, password: data.password })
      .unwrap()
      .then(() => {
        setEmailModal(data.email)
        setIsOpenModal(true)
        toast.success('Success')
        reset()
      })
      .catch(err => {
        err.data.messages.map(() => {
          if (err.data.messages[0].field === 'userName') {
            setError(`${err.data.messages[0].field}` as 'root', {
              type: 'manual',
              message: t.auth.signUp.userNameExistError,
            })
          }
          if (err.data.messages[0].field === 'email') {
            setError(`${err.data.messages[0].field}` as 'root', {
              type: 'manual',
              message: t.auth.signUp.emailExistError,
            })
          }
          // setError(`${err.data.messages[0].field}` as 'root', {
          //   type: 'server',
          //   message: el.message,
          // })
        })
      })
  }

  const handleSubmitForm = handleSubmit(onSubmit)

  return { control, handleSubmitForm, disableButton, emailModal, isOpenModal, setIsOpenModal }
}
