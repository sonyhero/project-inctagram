import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { useSignUpMutation } from '@/features/auth/auth-api'
import { SignInFormShem, SignUpForm } from '@/pages-flat/sign-up/sign-up-form/sign-up-form'

export const SignUp = () => {
  const [signUp] = useSignUpMutation()
  const router = useRouter()

  const onSubmit = (data: SignInFormShem) => {
    signUp({ userName: data.username, email: data.email, password: data.password })
      .unwrap()
      .then(() => {
        router.push('/')
      })
      .catch(err => toast.error(err.data.messages[0].message))
  }

  return <SignUpForm onSubmit={onSubmit} />
}
