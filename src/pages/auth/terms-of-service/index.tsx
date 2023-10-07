import { getAuthLayout } from '@/providers/auth-layout/auth-layout'
import { Privacy } from 'src/pages-flat/privacy'

const TermsOfServicePage = () => {
  return <Privacy text={'Terms of Service'} />
}

TermsOfServicePage.getLayout = getAuthLayout
export default TermsOfServicePage
