import React from 'react'

import s from './CurrentSubscription.module.scss'

import { useCurrentSubscriptionsQuery } from '@/entities/subscription/subscriptionApi'
import { CheckBox, Typography } from '@/shared/ui'

export const CurrentSubscription = () => {
  const { data } = useCurrentSubscriptionsQuery()

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }

    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return data?.data.length ? (
    <div className={s.block}>
      <Typography variant={'h3'} className={s.head}>
        Current Subscription:
      </Typography>
      <div className={s.main}>
        <div>
          <Typography color={'secondary'} variant={'regular14'} className={s.mainHead}>
            Expire at
          </Typography>
          <Typography variant={'medium14'}>{formatDate(data?.data[0].dateOfPayment)}</Typography>
        </div>
        <div>
          <Typography color={'secondary'} variant={'regular14'} className={s.mainHead}>
            Next payment
          </Typography>
          <Typography variant={'medium14'}>
            {formatDate(data?.data[0].endDateOfSubscription)}
          </Typography>
        </div>
      </div>
      <CheckBox checked={data?.data[0].autoRenewal} label={'Auto-Renewal'} />
    </div>
  ) : (
    <></>
  )
}
