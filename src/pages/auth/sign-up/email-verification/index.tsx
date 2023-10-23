import { EmailVerification } from '@/pages-flat/auth/ui/email-verefication'
import { getAuthLayout } from '@/shared/providers'

const EmailVerificationPage = () => {
  return <EmailVerification />
}

export default EmailVerificationPage
EmailVerificationPage.getLayout = getAuthLayout
