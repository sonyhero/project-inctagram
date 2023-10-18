import React from 'react'

import { useRouter } from 'next/router'

import { useMeQuery } from '@/features/auth'

export const Home = () => {
  const { data, isLoading } = useMeQuery()
  const router = useRouter()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!data) {
    router.push('auth/sign-in')
  }

  return <div>Home</div>
}
