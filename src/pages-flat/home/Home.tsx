import { useRouter } from 'next/router'

import { useMeQuery } from '@/features/auth'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'

export const Home = () => {
  const { data, isLoading } = useMeQuery()
  const router = useRouter()
  const { t } = useTranslation()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!data) {
    router.push(PATH.SIGN_IN)
  }

  return <div>{t.sidebar.home}</div>
}
