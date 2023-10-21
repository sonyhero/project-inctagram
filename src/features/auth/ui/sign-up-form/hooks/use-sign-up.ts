import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useSignUpMutation } from '@/features/auth/api/auth-api'

const sigInSchema = z
  .object({
    name: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(30, 'Maximum number of characters 30')
      .regex(/^[a-zA-Z0-9_-]*$/),
    email: z.string().email('The email must match the format example@example.com'),
    password: z
      .string()
      .min(6, 'Minimum number of characters 6')
      .max(20, 'Maximum number of characters 20')
      .regex(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/,
        'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
      ),
    passwordConfirm: z.string(),
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
    reset,
    formState: { isValid },
  } = useForm<SignUpFormShem>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      terms: false,
    },
    mode: 'onBlur',
    resolver: zodResolver(sigInSchema),
  })

  const watchCheckbox = watch('terms')
  const disableButton = !isValid || !watchCheckbox

  const onSubmit = (data: SignUpFormShem) => {
    signUp({ userName: data.name, email: data.email, password: data.password })
      .unwrap()
      .then(() => {
        setEmailModal(data.email)
        setIsOpenModal(true)
        toast.success('Success')
        reset()
      })
      .catch(err => {
        err.data.messages.map((el: any) => {
          setError(`${err.data.messages[0].field}` as 'root', {
            type: 'server',
            message: el.message,
          })
        })
      })
  }

  const handleSubmitForm = handleSubmit(onSubmit)

  return { control, handleSubmitForm, disableButton, emailModal, isOpenModal, setIsOpenModal }
}
