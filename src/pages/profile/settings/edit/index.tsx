import { getSettingsLayout } from '@/shared/providers/settings-layout'
import { AccountManagement } from '@/widgets/profile-settings/ui/account-management'

const EditPage = () => {
  return <AccountManagement />
}

export default EditPage
EditPage.getLayout = getSettingsLayout
