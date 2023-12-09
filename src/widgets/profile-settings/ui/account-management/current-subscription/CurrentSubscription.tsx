import React from 'react'

import { useRouter } from 'next/router'

import s from './CurrentSubscription.module.scss'

import {
  useCanceledAutoRenewalMutation,
  useCurrentSubscriptionsQuery,
} from '@/entities/subscription/api/subscriptionApi'
import { CheckBox, Typography } from '@/shared/ui'
import { getNumericDayMonthTime } from '@/shared/utils'

export const CurrentSubscription = () => {
  const { data } = useCurrentSubscriptionsQuery()
  const [canceledAutoRenewal, { isLoading }] = useCanceledAutoRenewalMutation()
  const { locale } = useRouter()

  const dateExpireAt =
    data &&
    data.data.length > 0 &&
    getNumericDayMonthTime(data?.data[data.data.length - 1].endDateOfSubscription, locale as string)

  const dateNextPay =
    data &&
    data.data.length > 0 &&
    getNumericDayMonthTime(
      data.data[data.data.length - 1].endDateOfSubscription,
      locale as string,
      true
    )
  const canceledAutoRenewalHandler = () => {
    canceledAutoRenewal()
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
          <Typography variant={'medium14'}>{dateExpireAt}</Typography>
        </div>
        {data?.hasAutoRenewal && (
          <div>
            <Typography color={'secondary'} variant={'regular14'} className={s.mainHead}>
              Next payment
            </Typography>
            <Typography variant={'medium14'}>{dateNextPay}</Typography>
          </div>
        )}
      </div>
      <CheckBox
        onChange={canceledAutoRenewalHandler}
        checked={data?.hasAutoRenewal}
        label={'Auto-Renewal'}
        disabled={isLoading || !data?.hasAutoRenewal}
      />
    </div>
  ) : (
    <></>
  )
}
