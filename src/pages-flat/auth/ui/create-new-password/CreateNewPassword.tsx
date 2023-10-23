import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { CreateNewPasswordForm, useCheckRecoveryCodeMutation } from '@/features/auth'

export const CreateNewPassword = () => {
  const router = useRouter()
  const query = router.query as { code: string; email: string }
  const [checkRecoveryCode, { error }] = useCheckRecoveryCodeMutation()

  useEffect(() => {
    checkRecoveryCode({ recoveryCode: query.code })
      .unwrap()
      .then(() => {
        error && router.push('/auth/bad-recovery-link')
      })
  }, [])

  return <CreateNewPasswordForm recoveryCode={query.code} />
}
