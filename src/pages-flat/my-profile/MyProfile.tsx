import { useRouter } from 'next/router'

import { Profile } from '@/entities/profile'
import { useMeQuery } from '@/features/auth'
import { PATH } from '@/shared/config/routes'
import { useAppSelector } from '@/shared/store'
import { ProfileSettings } from '@/widgets/profile-settings'

export const MyProfile = () => {
  const { data, isLoading } = useMeQuery()
  const showProfileSettings = useAppSelector(
    state => state.profileSettingsSlice.showProfileSettings
  )
  const router = useRouter()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!data) {
    router.push(PATH.SIGN_IN)

    return
  }

  return showProfileSettings ? (
    <ProfileSettings userId={data.userId} />
  ) : (
    <Profile userId={data.userId} />
  )
}
