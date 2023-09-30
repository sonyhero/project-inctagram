import React from 'react'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { useLogoutMutation, useMeQuery } from '@/features/auth/auth-api'
import { Button } from '@/shared'

export const MyProfile = () => {
  const { data, isLoading } = useMeQuery()
  const router = useRouter()
  const [logout] = useLogoutMutation()
  const handleDone = () => {
    toast.success('ok')
  }
  const handleError = () => {
    toast.error('error')
  }

  if (isLoading) return <div>...Loading</div>

  if (!data) router.push('/auth/sign-in')

  return (
    <>
      <Button onClick={handleDone}>Done</Button>
      <Button variant={'secondary'} onClick={handleError}>
        Error
      </Button>
      <Button onClick={() => logout()}>Logout</Button>
    </>
  )
}
