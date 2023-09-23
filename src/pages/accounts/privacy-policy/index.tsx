import { getAuthLayout } from '@/providers/auth-layout/auth-layout'
import { Privacy } from 'src/pages-flat/privacy'

const PrivacyPolicyPage = () => {
  return <Privacy text={'Privacy Policy'} />
}

PrivacyPolicyPage.getLayout = getAuthLayout
export default PrivacyPolicyPage
