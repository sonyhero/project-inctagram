import { GitHubAccess } from '@/pages-flat/github'
import { getAuthLayout } from '@/providers/auth-layout/auth-layout'

const GitHubPage = () => {
  return <GitHubAccess />
}

export default GitHubPage
GitHubPage.getLayout = getAuthLayout
