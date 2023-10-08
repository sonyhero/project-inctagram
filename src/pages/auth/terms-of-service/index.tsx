import { Privacy } from '@/pages-flat/privacy'
import { getAuthLayout } from '@/providers/auth-layout/auth-layout'

const TermsOfServicePage = () => {
  return <Privacy text={'Terms of Service'} />
}

TermsOfServicePage.getLayout = getAuthLayout
export default TermsOfServicePage
