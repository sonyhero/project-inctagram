import { useRouter } from 'next/router'

import { useMeQuery } from '@/features/auth'
import { PATH } from '@/shared/config/routes'
import { getBaseLayout } from '@/shared/providers'
import { ProfileSettings } from '@/widgets/profile-settings'

const SettingsPage = () => {
  const { data, isLoading } = useMeQuery()
  const { push } = useRouter()

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (!data) {
    push(PATH.SIGN_IN)

    return
  }

  return <ProfileSettings />
}

export default SettingsPage
SettingsPage.getLayout = getBaseLayout
