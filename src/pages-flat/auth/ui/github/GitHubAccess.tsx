import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useGithubLoginQuery, useLazyMeQuery } from '@/features/auth'
import { PATH } from '@/shared/config/routes'

export const GitHubAccess = () => {
  const [authMe, { data }] = useLazyMeQuery()
  const {} = useGithubLoginQuery()
  const router = useRouter()
  const query = router.query as { accessToken: string; email: string }

  useEffect(() => {
    if (query.accessToken) {
      localStorage.setItem('access', query.accessToken)
      authMe()
    }
  }, [query.accessToken])

  if (data) router.push(PATH.HOME)

  // TODO сделать адекватный loader
  return <div>...loading</div>
}
