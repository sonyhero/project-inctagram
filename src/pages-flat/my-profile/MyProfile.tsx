import { useRouter } from 'next/router'

import { useMeQuery } from '@/features/auth'
import { ProfileSettings } from '@/widgets/profile-settings'

export const MyProfile = () => {
  const { data, isLoading } = useMeQuery()
  const router = useRouter()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!data) {
    router.push('auth/sign-in')

    return
  }

  return <ProfileSettings userId={data.userId} />
}
