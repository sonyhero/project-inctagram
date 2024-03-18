import { Congratulations } from '@/pages-flat/auth/ui/congratulations'
import { getAuthLayout } from '@/shared/providers'

const CongratulationsPage = () => {
  return <Congratulations />
}

export default CongratulationsPage
CongratulationsPage.getLayout = getAuthLayout
