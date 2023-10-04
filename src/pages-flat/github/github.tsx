import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useGithubLoginQuery, useLazyMeQuery } from '@/features/auth/auth-api'

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

  if (data) router.push('/')

  return <div>...loading</div>
}
