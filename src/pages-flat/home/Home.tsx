import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { profileActions } from '@/entities/profile/model'
import { useMeQuery } from '@/features/auth'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { useAppDispatch } from '@/shared/store'

export const Home = () => {
  const { data, isLoading } = useMeQuery()
  const router = useRouter()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data) {
      dispatch(
        profileActions.updateUserData({
          email: data.email,
          userName: data.userName,
          userId: data.userId,
        })
      )
    }
  }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!data) {
    router.push('auth/sign-in')
  }

  return <div>{t.sidebar.home}</div>
}
