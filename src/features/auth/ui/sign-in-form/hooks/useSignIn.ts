import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useLoginMutation } from '@/features/auth/api/authApi'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks'
import { LocaleType } from '@/shared/locales'

type SignInFormShem = z.infer<ReturnType<typeof getSigInSchema>>

const getSigInSchema = (t: LocaleType) => {
  return z.object({
    email: z.string().email(t.zodSchema.email),
    password: z.string(),
  })
}

export const useSignIn = () => {
  const [signIn, { isError, isLoading }] = useLoginMutation()
  const router = useRouter()
  const { t } = useTranslation()
  const sigInSchema = getSigInSchema(t)

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
        toast.success(t.toast.success)
        localStorage.setItem('access', res.accessToken)
        router.push(PATH.HOME)
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
      })
  }

  isLoading ? NProgress.start() : NProgress.done()
  isError && toast.error(t.toast.fetchError)

  const handleSubmitForm = handleSubmit(onSubmit)

  return { handleSubmitForm, control, isValid }
}
