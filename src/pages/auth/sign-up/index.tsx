import { SignUp } from '@/pages-flat/auth/ui/sign-up'
import { getAuthLayout } from '@/shared/providers'

const SignUpPage = () => {
  return <SignUp />
}

export default SignUpPage
SignUpPage.getLayout = getAuthLayout
