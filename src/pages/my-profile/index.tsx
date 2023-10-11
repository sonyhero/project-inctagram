import { MyProfile } from '@/pages-flat/my-profile'
import { getBaseLayout } from '@/providers/layout/layout'

const MyProfilePage = () => {
  return <MyProfile />
}

export default MyProfilePage
MyProfilePage.getLayout = getBaseLayout
