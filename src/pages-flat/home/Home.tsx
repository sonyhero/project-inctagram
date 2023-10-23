import { useRouter } from 'next/router'

import { useMeQuery } from '@/features/auth'
import { useTranslation } from '@/shared/hooks/useTranstaion'

export const Home = () => {
  const { data, isLoading } = useMeQuery()
  const router = useRouter()
  const { t } = useTranslation()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!data) {
    router.push('auth/sign-in')
  }

  return <div>{t.sidebar.home}</div>
}
