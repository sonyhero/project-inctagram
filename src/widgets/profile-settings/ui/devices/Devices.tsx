import { useRouter } from 'next/router'

import s from './Devices.module.scss'

import {
  SessionsTypeResponse,
  useGetSessionsQuery,
  useTerminateAllOtherSessionsMutation,
  useTerminateSessionMutation,
} from '@/entities/session/api'
import { useTranslation } from '@/shared/hooks'
import { Button, LogOut, Typography } from '@/shared/ui'
import { getNumericDayMonthTime } from '@/shared/utils'

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
      {currentDeviceData && <ActiveDevice {...currentDeviceData} />}
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

type Props = Partial<SessionsTypeResponse>

export const ActiveDevice = (props: Props) => {
  const { ip, lastActive, deviceType, deviceName, deviceId } = props
  const [terminateSession] = useTerminateSessionMutation()
  const { locale } = useRouter()
  const { t } = useTranslation()

  const lastVisitDate = lastActive && getNumericDayMonthTime(lastActive, locale as string)

  const logoutHandler = () => {
    deviceId && terminateSession(deviceId)
  }

  const isActiveSession = deviceType && deviceType

  return (
    <div className={s.device}>
      {deviceType && <div>deviceType:{deviceType}</div>}
      {deviceName && <div>deviceName:{deviceName}</div>}
      <div>ip:{ip}</div>
      <div>last visit:{lastVisitDate}</div>
      {isActiveSession && (
        <Button className={s.logout} variant={'text'} onClick={logoutHandler}>
          <LogOut />
          <Typography color={'primary'} variant={'medium14'}>
            {t.sidebar.logout}
          </Typography>
        </Button>
      )}
    </div>
  )
}
