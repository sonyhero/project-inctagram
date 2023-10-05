import { BadRecoveryLink } from '@/pages-flat/create-new-password/bad-recovery-link/bad-recovery-link'
import { getAuthLayout } from '@/providers/auth-layout/auth-layout'

const BadRecoveryLinkPage = () => {
  return <BadRecoveryLink />
}

export default BadRecoveryLinkPage
BadRecoveryLinkPage.getLayout = getAuthLayout
