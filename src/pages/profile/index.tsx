import { MyProfile } from '@/pages-flat/my-profile'
import { getBaseLayout } from '@/shared/providers'

const SettingsPage = () => {
  return <MyProfile />
}

export default SettingsPage
SettingsPage.getLayout = getBaseLayout
