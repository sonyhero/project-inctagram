import React from 'react'

import { toast } from 'react-toastify'

import { Button } from '@/shared'

export const MyProfile = () => {
  const handleDone = () => {
    toast.success('ok')
  }
  const handleError = () => {
    toast.error('error')
  }

  return (
    <>
      <Button onClick={handleDone}>Done</Button>
      <Button variant={'secondary'} onClick={handleError}>
        Error
      </Button>
    </>
  )
}
