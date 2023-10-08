import { Privacy } from '@/pages-flat/privacy'
import { getAuthLayout } from '@/providers/auth-layout/auth-layout'

const PrivacyPolicyPage = () => {
  return <Privacy text={'Privacy Policy'} />
}

PrivacyPolicyPage.getLayout = getAuthLayout
export default PrivacyPolicyPage
