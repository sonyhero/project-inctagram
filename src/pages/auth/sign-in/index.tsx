import { SignIn } from '@/pages-flat/auth/ui/sign-in'
import { getAuthLayout } from '@/shared/providers'

const SignInPage = () => {
  return <SignIn />
}

export default SignInPage
SignInPage.getLayout = getAuthLayout
