import { useRouter } from 'next/router'

import { useMeQuery } from '@/features/auth'
import { PATH } from '@/shared/config/routes'
import { ProfileInfo } from '@/widgets/profile-info'

export const MyProfile = () => {
  const { data, isLoading } = useMeQuery()
  const { push } = useRouter()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!data) {
    push(PATH.SIGN_IN)

    return
  }

  return <ProfileInfo userId={data.userId} />
}
