import { MyProfile } from '@/pages-flat/my-profile/my-profile'
import { getBaseLayout } from '@/providers/layout/layout'

const MyProfilePage = () => {
  return (
    <div>
      <MyProfile />
    </div>
  )
}

export default MyProfilePage
MyProfilePage.getLayout = getBaseLayout
