import { ForgotPassword } from '@/pages-flat/forgot-password'
import { getAuthLayout } from '@/providers/auth-layout/auth-layout'

const ForgotPasswordPage = () => {
  return <ForgotPassword />
}

export default ForgotPasswordPage
ForgotPasswordPage.getLayout = getAuthLayout
