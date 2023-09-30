import { MyProfile } from '@/pages-flat/my-profile/my-profile'
import { getBaseLayout } from '@/providers/layout/layout'

export default function Home() {
  return <MyProfile />
}

Home.getLayout = getBaseLayout
