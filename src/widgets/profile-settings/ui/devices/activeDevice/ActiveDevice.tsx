import { useRouter } from 'next/router'

import s from './ActiveDevice.module.scss'

import { SessionsTypeResponse, useTerminateSessionMutation } from '@/entities/session/api'
import { useTranslation } from '@/shared/hooks'
import { Button, LogOut, Typography } from '@/shared/ui'
import {
  BrowserIcon,
  ChromeIcon,
  DesctopIcon,
  FireFoxIcon,
  MobileIcon,
  OperaIcon,
  YandexIcon,
} from '@/shared/ui/icons/devices'
import { getNumericDayMonthTime } from '@/shared/utils'

type Props = Partial<SessionsTypeResponse> & { isCurrentDevice?: boolean }

export const ActiveDevice = (props: Props) => {
  const {
    ip,
    lastActive,
    deviceType,
    deviceName,
    deviceId,
    browserName,
    osName,
    isCurrentDevice = false,
  } = props
  const [terminateSession] = useTerminateSessionMutation()
  const { locale } = useRouter()
  const { t } = useTranslation()

  const isActiveSession = deviceType && deviceType

  const deviceTypeImage = deviceType === 'mobile' ? <MobileIcon /> : <DesctopIcon />

  const getBrowserImage = (value: string) => {
    switch (value.toLowerCase()) {
      case 'chrome':
        return <ChromeIcon />
      case 'yandex':
        return <YandexIcon />
      case 'opera':
        return <OperaIcon />
      case 'firefox':
        return <FireFoxIcon />
      default:
        return <BrowserIcon />
    }
  }

  const deviceImage = isCurrentDevice ? getBrowserImage(browserName ?? '') : deviceTypeImage

  const deviceDescription = isCurrentDevice ? (
    <Typography variant={'bold16'}>{browserName}</Typography>
  ) : (
    <Typography variant={'bold16'}>
      {deviceName} {osName}
    </Typography>
  )

  const lastVisitDate = lastActive && getNumericDayMonthTime(lastActive, locale as string)

  const logoutHandler = () => {
    deviceId && terminateSession(deviceId)
  }

  return (
    <div className={s.activeDevice}>
      <div className={s.deviceBlock}>
        <div>{deviceImage}</div>
        <div className={s.descriptionBlock}>
          {deviceDescription}
          <Typography variant={'bold16'}></Typography>
          <Typography variant={'regular14'}>IP:{ip}</Typography>
          {!isCurrentDevice && (
            <Typography variant={'small'}>Last visit:{lastVisitDate}</Typography>
          )}
        </div>
      </div>

      <div className={s.logoutBlock}>
        {isActiveSession && (
          <Button variant={'text'} onClick={logoutHandler}>
            <LogOut />
            <Typography color={'primary'} variant={'medium14'}>
              {t.sidebar.logout}
            </Typography>
          </Button>
        )}
      </div>
    </div>
  )
}
