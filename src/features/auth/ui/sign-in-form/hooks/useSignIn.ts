import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useLoginMutation } from '@/features/auth/api/auth-api'

type SignInFormShem = z.infer<typeof sigInSchema>

const sigInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})

export const useSignIn = () => {
  const [signIn] = useLoginMutation()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid },
  } = useForm<SignInFormShem>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(sigInSchema),
  })

  const onSubmit = (data: SignInFormShem) => {
    signIn(data)
      .unwrap()
      .then(res => {
        localStorage.setItem('access', res.accessToken)
        router.push('/')
        toast.success('Success')
      })
      .catch(err => {
        setError('password', {
          type: 'server',
          message: err.data.messages,
        })
      })
  }

  const handleSubmitForm = handleSubmit(onSubmit)

  return { handleSubmitForm, control, isValid }
}
