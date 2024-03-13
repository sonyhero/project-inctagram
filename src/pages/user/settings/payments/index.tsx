import { useRouter } from 'next/router'

import { useMeQuery } from '@/features/auth'
import { PATH } from '@/shared/config/routes'
import { getBaseLayout } from '@/shared/providers'
import { getSettingsLayout } from '@/shared/providers/settings-layout'
import { MyPayments } from '@/widgets/profile-settings/ui/my-payments/MyPayments'

const PaymentsPage = () => {
  const { data, isLoading } = useMeQuery()
  const { push } = useRouter()

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (!data) {
    push(PATH.SIGN_IN)

    return
  }

  return getSettingsLayout(<MyPayments />)
}

export default PaymentsPage
PaymentsPage.getLayout = getBaseLayout
