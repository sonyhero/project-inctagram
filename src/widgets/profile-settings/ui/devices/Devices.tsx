import s from './Devices.module.scss'

import { useGetSessionsQuery, useTerminateAllOtherSessionsMutation } from '@/entities/session/api'
import { useTranslation } from '@/shared/hooks'
import { Button, Typography } from '@/shared/ui'
import { ActiveDevice } from '@/widgets/profile-settings/ui/devices/activeDevice'

export const Devices = () => {
  const { data } = useGetSessionsQuery()
  const [terminateAllOther] = useTerminateAllOtherSessionsMutation()
  const { t } = useTranslation()

  const terminateAllHandler = () => {
    terminateAllOther()
  }

  const currentDeviceData = data?.find(device => !device.deviceName && !device.deviceType)

  const devicesList = data
    ?.filter(device => device.deviceName && device.deviceType)
    .map(device => {
      return <ActiveDevice key={device.deviceId} {...device} />
    })

  return (
    <div className={s.devices}>
      <Typography variant={'h3'} className={s.currentDeviceHead}>
        {t.myProfile.devices.currentDevice}:
      </Typography>
      {currentDeviceData && <ActiveDevice {...currentDeviceData} isCurrentDevice />}
      <div className={s.buttonBlock}>
        <Button onClick={terminateAllHandler} variant={'outline'}>
          {t.myProfile.devices.terminateAllOtherSession}
        </Button>
      </div>
      <Typography variant={'h3'} className={s.currentDeviceHead}>
        {t.myProfile.devices.activeSession}:
      </Typography>
      <div>{devicesList}</div>
    </div>
  )
}
