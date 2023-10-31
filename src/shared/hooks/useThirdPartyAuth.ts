import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { toast } from 'react-toastify'

import { useGoogleLoginMutation } from '@/features/auth/api/authApi'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'

export const useThirdPartyAuth = () => {
  const router = useRouter()
  const [googleLogin, { isLoading, isError }] = useGoogleLoginMutation()
  const { t } = useTranslation()
  const onGoogleAuth = useGoogleLogin({
    onSuccess: codeResponse => {
      googleLogin({ code: codeResponse.code })
        .unwrap()
        .then(res => {
          toast.success(t.toast.success)
          localStorage.setItem('access', res.accessToken)
          router.push(PATH.HOME)
        })
    },
    flow: 'auth-code',
  })

  const onGitHubAuth = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login')
  }

  isLoading ? NProgress.start() : NProgress.done()
  isError && toast.error(t.toast.fetchError)

  return { onGoogleAuth, onGitHubAuth }
}
