import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { useGoogleLoginMutation } from '@/features/auth/auth-api'

export const useThirdPartyAuth = () => {
  const router = useRouter()
  const [googleLogin] = useGoogleLoginMutation()
  const onGoogleAuth = useGoogleLogin({
    onSuccess: codeResponse => {
      googleLogin({ code: codeResponse.code })
        .unwrap()
        .then(res => {
          localStorage.setItem('access', res.accessToken)
          router.push('/')
          toast.success('Success')
        })
    },
    flow: 'auth-code',
  })
  const onGitHubAuth = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login')
  }

  return {
    onGoogleAuth,
    onGitHubAuth,
  }
}
