import { SignIn } from '@/pages-flat/sign-in'
import { getAuthLayout } from '@/providers/auth-layout/auth-layout'

const SignInPage = () => {
  return (
    <div>
      <SignIn />
    </div>
  )
}

export default SignInPage
SignInPage.getLayout = getAuthLayout
