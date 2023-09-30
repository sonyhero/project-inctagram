import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useSignUpMutation } from '@/features/auth/auth-api'

const sigInSchema = z
  .object({
    userName: z.string().min(6).max(30),
    email: z.string().email(),
    password: z
      .string()
      .min(6)
      .max(20)
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!\"#$%&'()*+,-.\/:;<=>?@[\\\]^_`{|}~]).*$/,
        'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
      ),
    passwordConfirm: z.string(),
    terms: z.boolean().default(true),
  })
  .refine(data => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'The passwords must match',
  })
  .refine(data => data.terms, {
    path: ['terms'],
    message: 'Confirm terms',
  })

export type SignUpFormShem = z.infer<typeof sigInSchema>

export const useSignUp = () => {
  const [signUp] = useSignUpMutation()
  const [emailModal, setEmailModal] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(false)

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { isValid },
  } = useForm<SignUpFormShem>({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      terms: false,
    },
    resolver: zodResolver(sigInSchema),
  })

  const watchCheckbox = watch('terms')
  const disableButton = !isValid || !watchCheckbox

  const onSubmit = (data: SignUpFormShem) => {
    signUp({ userName: data.userName, email: data.email, password: data.password })
      .unwrap()
      .then(() => {
        // router.push('/')
        setEmailModal(data.email)
        setIsOpenModal(true)
        toast.success('Success')
      })
      .catch(err => {
        setError(`${err.data.messages[0].field}` as 'root', {
          message: err.data.messages[0].message,
        })
        toast.error(err.data.messages[0].message)
      })
  }

  const handleSubmitForm = handleSubmit(onSubmit)

  return { control, handleSubmitForm, disableButton, emailModal, isOpenModal, setIsOpenModal }
}
