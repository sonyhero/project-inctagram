import { EmailVerification } from '@/pages-flat/sign-up/email-verefication'
import { getAuthLayout } from '@/providers/auth-layout/auth-layout'

const EmailVerificationPage = () => {
  return <EmailVerification />
}

export default EmailVerificationPage
EmailVerificationPage.getLayout = getAuthLayout
