import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useSignUpMutation } from '@/features/auth/auth-api'

const sigInSchema = z
  .object({
    username: z.string().min(6).max(30),
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

export type SignInFormShem = z.infer<typeof sigInSchema>

export const useSignUp = () => {
  const { control, handleSubmit, setError } = useForm<SignInFormShem>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      terms: true,
    },
    resolver: zodResolver(sigInSchema),
  })

  const [signUp] = useSignUpMutation()
  const router = useRouter()

  const onSubmit = (data: SignInFormShem) => {
    signUp({ userName: data.username, email: data.email, password: data.password })
      .unwrap()
      .then(() => {
        router.push('/')
      })
      .catch(err => {
        setError('username', { message: err.data.messages[0].message })
        // toast.error(err.data.messages[0].message)
      })
  }

  const handleSubmitForm = handleSubmit(onSubmit)

  return { control, handleSubmitForm }
}
