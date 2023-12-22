import { useRouter } from 'next/router'

import { useMeQuery } from '@/features/auth'
import { PATH } from '@/shared/config/routes'
import { getSettingsLayout } from '@/shared/providers/settings-layout'
import { GeneralInformation } from '@/widgets/profile-settings/ui/general-information/GeneralInformation'

const GeneralPage = () => {
  const { data, isLoading } = useMeQuery()
  const { push } = useRouter()

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (!data) {
    push(PATH.SIGN_IN)

    return
  }

  return <GeneralInformation />
}

export default GeneralPage
GeneralPage.getLayout = getSettingsLayout
