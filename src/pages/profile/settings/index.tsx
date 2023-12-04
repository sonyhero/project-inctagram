import { getBaseLayout } from '@/shared/providers'
import { ProfileSettings } from '@/widgets/profile-settings'

const MyProfilePage = () => {
  return <ProfileSettings />
}

export default MyProfilePage
MyProfilePage.getLayout = getBaseLayout
