import s from './Devices.module.scss'

import { useGetSessionsQuery, useTerminateAllOtherSessionsMutation } from '@/entities/session/api'
import { Button, Typography } from '@/shared/ui'
import { ActiveDevice } from '@/widgets/profile-settings/ui/devices/activeDevice'

export const Devices = () => {
  const { data } = useGetSessionsQuery()
  const [terminateAllOther] = useTerminateAllOtherSessionsMutation()

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
        Current device:
      </Typography>
      {currentDeviceData && <ActiveDevice {...currentDeviceData} isCurrentDevice />}
      <div className={s.buttonBlock}>
        <Button onClick={terminateAllHandler} variant={'outline'}>
          Terminate all other session
        </Button>
      </div>
      <Typography variant={'h3'} className={s.currentDeviceHead}>
        Active sessions:
      </Typography>
      <div>{devicesList}</div>
    </div>
  )
}
