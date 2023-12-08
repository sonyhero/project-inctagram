import { getSettingsLayout } from '@/shared/providers/settings-layout'
import { MyPayments } from '@/widgets/profile-settings/ui/my-payments/MyPayments'

const PaymentsPage = () => {
  return <MyPayments />
}

export default PaymentsPage
PaymentsPage.getLayout = getSettingsLayout
