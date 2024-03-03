import { useRouter } from 'next/router'

import { useMeQuery } from '@/features/auth'
import { PATH } from '@/shared/config/routes'
import { getBaseLayout } from '@/shared/providers'
import { getSettingsLayout } from '@/shared/providers/settings-layout'
import { Devices } from '@/widgets/profile-settings/ui/devices/Devices'

const DevicesPage = () => {
  const { data, isLoading } = useMeQuery()
  const { push } = useRouter()

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (!data) {
    push(PATH.SIGN_IN)

    return
  }

  return getSettingsLayout(<Devices />)
}

export default DevicesPage
DevicesPage.getLayout = getBaseLayout
