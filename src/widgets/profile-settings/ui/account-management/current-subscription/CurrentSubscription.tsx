import React from 'react'

import { useRouter } from 'next/router'

import s from './CurrentSubscription.module.scss'

import { useCurrentSubscriptionsQuery } from '@/entities/subscription/subscriptionApi'
import { CheckBox, Typography } from '@/shared/ui'
import { getNumericDayMonthTime } from '@/shared/utils'

export const CurrentSubscription = () => {
  const { data } = useCurrentSubscriptionsQuery()
  const { locale } = useRouter()

  const dateExpireAt = data && getNumericDayMonthTime(data.data[0].dateOfPayment, locale as string)

  const dateNextPayment =
    data && getNumericDayMonthTime(data?.data[0].endDateOfSubscription, locale as string)

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
          <Typography variant={'medium14'}>{dateExpireAt}</Typography>
        </div>
        <div>
          <Typography color={'secondary'} variant={'regular14'} className={s.mainHead}>
            Next payment
          </Typography>
          <Typography variant={'medium14'}>{dateNextPayment}</Typography>
        </div>
      </div>
      <CheckBox checked={data?.data[0].autoRenewal} label={'Auto-Renewal'} />
    </div>
  ) : (
    <></>
  )
}
