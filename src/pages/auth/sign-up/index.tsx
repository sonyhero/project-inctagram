import { SignUp } from '@/pages-flat/sign-up'
import { getAuthLayout } from '@/providers/auth-layout/auth-layout'

const SignUpPage = () => {
  return <SignUp />
}

export default SignUpPage
SignUpPage.getLayout = getAuthLayout
