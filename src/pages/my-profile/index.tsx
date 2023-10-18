import { MyProfile } from '@/pages-flat/my-profile'
import { getBaseLayout } from '@/shared/providers'

const MyProfilePage = () => {
  return <MyProfile />
}

export default MyProfilePage
MyProfilePage.getLayout = getBaseLayout
