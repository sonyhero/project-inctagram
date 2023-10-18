import { Privacy } from '@/pages-flat/auth/ui/privacy'
import { getAuthLayout } from '@/shared/providers'

const PrivacyPolicyPage = () => {
  return <Privacy text={'Privacy Policy'} />
}

PrivacyPolicyPage.getLayout = getAuthLayout
export default PrivacyPolicyPage
