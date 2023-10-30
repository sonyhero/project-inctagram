import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useLoginMutation } from '@/features/auth/api/authApi'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks'

type SignInFormShem = z.infer<typeof sigInSchema>

const sigInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const useSignIn = () => {
  const [signIn] = useLoginMutation()
  const router = useRouter()
  const { t } = useTranslation()

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
        router.push(PATH.HOME)
        toast.success('Success')
      })
      .catch(err => {
        if (err.data?.messages === 'invalid password or email') {
          setError('email', {
            type: 'manual',
            message: ' ',
          })
          setError('password', {
            type: 'manual',
            message: t.auth.signIn.signInServerError,
          })
        }
        if (err.status === 'FETCH_ERROR') {
          toast.error('Ошибка соединения с сервером')
        }
      })
  }

  const handleSubmitForm = handleSubmit(onSubmit)

  return { handleSubmitForm, control, isValid }
}
