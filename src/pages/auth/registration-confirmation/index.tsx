import { Congratulations } from '@/pages-flat/sign-up/congratulations'
import { getAuthLayout } from '@/providers/auth-layout/auth-layout'

const CongratulationsPage = () => {
  return <Congratulations />
}

export default CongratulationsPage
CongratulationsPage.getLayout = getAuthLayout
