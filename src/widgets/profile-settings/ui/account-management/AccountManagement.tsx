import { useEffect, useState } from 'react'

import s from './AccountManagement.module.scss'
import { AccountTypeOptions, SubscriptionOptionsType } from './AccountManagement.types'
import { CurrentSubscription } from './current-subscription'

import {
  useCostOfSubscriptionsQuery,
  useCreateSubscriptionMutation,
} from '@/entities/subscription/subscriptionApi'
import { SubscriptionDurationType } from '@/entities/subscription/subscriptionApi.types'
import { Nullable } from '@/shared/types'
import { Paypal, Stripe, Typography } from '@/shared/ui'
import { RadioGroupDemo } from '@/shared/ui/radio-group'

const accountTypeOptions: AccountTypeOptions[] = [
  { id: 1, value: 'Personal' },
  { id: 2, value: 'Business' },
]

const _subscriptionOptions: SubscriptionOptionsType[] = [
  { id: 0, value: '$10 per 1 Day', amount: 10, typeSubscription: 'DAY' },
  { id: 1, value: '$50 per 7 Day', amount: 50, typeSubscription: 'WEEKLY' },
  { id: 2, value: '$100 per month', amount: 100, typeSubscription: 'MONTHLY' },
]

export const AccountManagement = () => {
  const [createSub] = useCreateSubscriptionMutation()
  const { data: coastData } = useCostOfSubscriptionsQuery()
  const [accountTypeId, setAccountTypeId] = useState<number>(accountTypeOptions[0].id)
  const [subscriptionId, setSubscriptionId] = useState<number>(0)
  const [subscriptionOptions, setSubscriptionOptions] =
    useState<Nullable<SubscriptionOptionsType[]>>(null)

  const isBusiness = accountTypeId === 2 && subscriptionOptions

  useEffect(() => {
    if (coastData) {
      const subscriptions = coastData.data.map((coast, index) => {
        const perDuration = [`1 Day`, `7 Day`, `month`]

        return {
          id: index,
          value: `$${coast.amount} per ${perDuration[index]}`,
          amount: coast.amount,
          typeSubscription: coast.typeDescription as SubscriptionDurationType,
        }
      })

      setSubscriptionId(subscriptions[0].id)
      setSubscriptionOptions(subscriptions)
    }
  }, [coastData])

  const paymentsHandler = (paymentType: 'STRIPE' | 'PAYPAL') => {
    subscriptionOptions &&
      createSub({
        typeSubscription: subscriptionOptions[subscriptionId].typeSubscription,
        paymentType: paymentType,
        amount: subscriptionOptions[subscriptionId].amount,
        baseUrl: 'http://localhost:3000/',
      })
        .unwrap()
        .then(res => window.location.assign(res.url))
  }

  return (
    <div className={s.accountManagement}>
      <CurrentSubscription />
      <Typography variant={'h3'} className={s.radioHead}>
        Account type:
      </Typography>
      <div className={s.radioGroup}>
        <RadioGroupDemo
          defaultValue={accountTypeOptions[0].id}
          options={accountTypeOptions}
          onChangeOption={setAccountTypeId}
        />
      </div>
      {isBusiness && (
        <>
          <Typography variant={'h3'} className={s.radioHead}>
            Change your subscription:
          </Typography>
          <div className={s.radioGroup}>
            <RadioGroupDemo
              defaultValue={subscriptionOptions[0].id}
              options={subscriptionOptions}
              onChangeOption={setSubscriptionId}
            />
          </div>
          <div className={s.paymentsBlock}>
            <div className={s.payments}>
              <Paypal width={96} height={64} onClick={() => paymentsHandler('PAYPAL')} />
              <Typography variant={'regular14'}>Or</Typography>
              <Stripe width={96} height={64} onClick={() => paymentsHandler('STRIPE')} />
            </div>
          </div>
        </>
      )}
      {!subscriptionOptions && (
        <Typography variant={'h3'}>
          Subscriptions are currently unavailable, please try again later
        </Typography>
      )}
    </div>
  )
}
