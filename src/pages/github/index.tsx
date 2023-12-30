import { GitHubAccess } from '@/pages-flat/auth/ui/github'
import { getAuthLayout } from '@/shared/providers'

const GitHubPage = () => {
  return <GitHubAccess />
}

export default GitHubPage
GitHubPage.getLayout = getAuthLayout
