import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import NProgress from 'nprogress'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useSignUpMutation } from '@/features/auth/api/authApi'
import { PASSWORD_REGEX, USER_NAME_REGEX } from '@/shared/config/regex'
import { getZodSchema } from '@/shared/config/zodSchemas'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { LocaleType } from '@/shared/locales'

const getSigUpSchema = (t: LocaleType) => {
  const userNameZod = getZodSchema({
    t,
    lengthMin: 6,
    lengthMax: 30,
    regex: USER_NAME_REGEX,
    regexMessage: t.zodSchema.userNameRegex,
  })

  const passwordZod = getZodSchema({
    t,
    lengthMin: 6,
    lengthMax: 20,
    regex: PASSWORD_REGEX,
    regexMessage: `${t.zodSchema.passwordRegex} a-z, A-Z,  ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _\` { | } ~`,
  })

  return z
    .object({
      userName: userNameZod,
      email: z.string().email(t.zodSchema.email),
      password: passwordZod,
      passwordConfirm: z.string(),
      terms: z.boolean().default(false),
    })
    .refine(data => data.password === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: t.zodSchema.passwordRefine,
    })
    .refine(data => data.terms, {
      path: ['terms'],
      message: t.zodSchema.termsConfirm,
    })
}

export type SignUpFormShem = z.infer<ReturnType<typeof getSigUpSchema>>

export const useSignUp = () => {
  const [signUp, { isLoading, isError }] = useSignUpMutation()

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
        toast.success(t.toast.success)
        setEmailModal(data.email)
        setIsOpenModal(true)
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
        })
      })
  }

  const handleSubmitForm = handleSubmit(onSubmit)
  const onCloseModalHandler = () => {
    setIsOpenModal(false)
  }

  isLoading ? NProgress.start() : NProgress.done()
  isError && toast.error(t.toast.fetchError)

  return { control, handleSubmitForm, disableButton, emailModal, isOpenModal, onCloseModalHandler }
}
