import { getSettingsLayout } from '@/shared/providers/settings-layout'
import { Devices } from '@/widgets/profile-settings/ui/devices/Devices'

const DevicesPage = () => {
  return <Devices />
}

export default DevicesPage
DevicesPage.getLayout = getSettingsLayout
