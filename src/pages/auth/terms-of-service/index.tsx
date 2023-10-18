import { Privacy } from '@/pages-flat/auth/ui/privacy'
import { getAuthLayout } from '@/shared/providers'

const TermsOfServicePage = () => {
  return <Privacy text={'Terms of Service'} />
}

TermsOfServicePage.getLayout = getAuthLayout
export default TermsOfServicePage
