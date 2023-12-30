import { BadRecoveryLink } from '@/pages-flat/auth/ui/bad-recovery-link'
import { getAuthLayout } from '@/shared/providers'

const BadRecoveryLinkPage = () => {
  return <BadRecoveryLink />
}

export default BadRecoveryLinkPage
BadRecoveryLinkPage.getLayout = getAuthLayout
