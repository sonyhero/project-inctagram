import { useRouter } from 'next/router'

import { useMeQuery } from '@/features/auth'
import { PATH } from '@/shared/config/routes'
import { getBaseLayout } from '@/shared/providers'
import { ProfileInfo } from '@/widgets/profile-info'

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

  return <ProfileInfo userId={data.userId} />
}

export default MyProfilePage
MyProfilePage.getLayout = getBaseLayout
