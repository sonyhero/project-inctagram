import { useRouter } from 'next/router'

import { useMeQuery } from '@/features/auth'
import { MyProfile } from '@/pages-flat/my-profile'
import { PATH } from '@/shared/config/routes'
import { getBaseLayout } from '@/shared/providers'

const MyProfilePage = () => {
  const { data, isLoading } = useMeQuery()
  const { push } = useRouter()

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (!data) {
    push(PATH.SIGN_IN)

    return
  }

  return <MyProfile userId={data.userId} />
}

export default MyProfilePage
MyProfilePage.getLayout = getBaseLayout
