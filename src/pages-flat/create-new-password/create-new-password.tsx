import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useCheckRecoveryCodeMutation } from '@/features/auth/auth-api'
import { CreateNewPasswordForm } from '@/pages-flat/create-new-password/create-new-password-form/create-new-password-form'

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
