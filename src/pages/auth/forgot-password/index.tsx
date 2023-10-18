import { ForgotPassword } from '@/pages-flat/auth/ui/forgot-password'
import { getAuthLayout } from '@/shared/providers'

const ForgotPasswordPage = () => {
  return <ForgotPassword />
}

export default ForgotPasswordPage
ForgotPasswordPage.getLayout = getAuthLayout
