import { useEffect, useState } from 'react'

import s from './NotificationDropDown.module.scss'

import { useMarkNotificationAsReadMutation } from '@/features/notifications'
import { useAppSelector } from '@/shared/store'
import { Bell, Typography } from '@/shared/ui'
import { DropDownMenu } from '@/shared/ui/drop-down-menu'

export const NotificationDropDown = () => {
  const [openDropDown, setOpenDropDown] = useState(false)
  const notifications = useAppSelector(state => state.notificationsSlice.notifications)
  const [readNotifications] = useMarkNotificationAsReadMutation()

  const dropDownMenuItems = [
    {
      id: 1,
      component: (
        <div style={{ width: '23.2rem', color: 'white' }}>
          <span>Уведомления</span>
        </div>
      ),
    },
    {
      id: 2,
      component: (
        <div
          style={{
            width: '23.2rem',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            gap: '10px',
          }}
        >
          {notifications.map(el => {
            return <div key={el.id}>{el.message}</div>
          })}
        </div>
      ),
    },
  ]

  const unReaderNotifications = notifications.filter(el => !el.isRead).map(el => el.id)

  useEffect(() => {
    if (openDropDown && !!unReaderNotifications.length) {
      readNotifications({ ids: unReaderNotifications })
    }
  }, [openDropDown])

  return (
    <DropDownMenu
      open={openDropDown}
      setOpen={setOpenDropDown}
      align={'end'}
      trigger={
        <div className={s.bellWrapper}>
          <Bell />
          {!!unReaderNotifications.length && (
            <div className={s.count}>
              <Typography variant={'small'}>{unReaderNotifications.length}</Typography>
            </div>
          )}
        </div>
      }
      items={dropDownMenuItems}
    />
  )
}
