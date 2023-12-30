import { useRouter } from 'next/router'

import { useMeQuery } from '@/features/auth'
import { PATH } from '@/shared/config/routes'
import { getSettingsLayout } from '@/shared/providers/settings-layout'
import { AccountManagement } from '@/widgets/profile-settings/ui/account-management'

const EditPage = () => {
  const { data, isLoading } = useMeQuery()
  const { push } = useRouter()

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (!data) {
    push(PATH.SIGN_IN)

    return
  }

  return <AccountManagement />
}

export default EditPage
EditPage.getLayout = getSettingsLayout
