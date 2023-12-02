import { useState } from 'react'

import s from './AccountManagement.module.scss'
import { AccountTypeOptions, SubscriptionOptionsType } from './AccountManagement.types'
import { CurrentSubscription } from './current-subscription'

import { useCreateSubscriptionMutation } from '@/entities/subscription/subscriptionApi'
import { Paypal, Stripe, Typography } from '@/shared/ui'
import { RadioGroupDemo } from '@/shared/ui/radio-group'

const accountTypeOptions: AccountTypeOptions[] = [
  { id: 1, value: 'Personal' },
  { id: 2, value: 'Business' },
]

const subscriptionOptions: SubscriptionOptionsType[] = [
  { id: 0, value: '$10 per 1 Day', amount: 10, typeSubscription: 'DAY' },
  { id: 1, value: '$50 per 7 Day', amount: 50, typeSubscription: 'WEEKLY' },
  { id: 2, value: '$100 per month', amount: 5, typeSubscription: 'MONTHLY' },
]

export const AccountManagement = () => {
  const [createSub] = useCreateSubscriptionMutation()

  const [accountType, setAccountType] = useState<number>(accountTypeOptions[0].id)
  const [subscriptionAmount, setSubscriptionAmount] = useState<number>(subscriptionOptions[0].id)

  const paypalHandler = (paymentType: 'STRIPE' | 'PAYPAL') => {
    createSub({
      typeSubscription: subscriptionOptions[subscriptionAmount].typeSubscription,
      paymentType: paymentType,
      amount: subscriptionOptions[subscriptionAmount].amount,
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
        <RadioGroupDemo options={accountTypeOptions} onChangeOption={setAccountType} />
      </div>
      {accountType === 2 && (
        <div>
          <Typography variant={'h3'} className={s.radioHead}>
            Change your subscription:
          </Typography>
          <div className={s.radioGroup}>
            <RadioGroupDemo options={subscriptionOptions} onChangeOption={setSubscriptionAmount} />
          </div>
        </div>
      )}
      <div className={s.paymentsBlock}>
        <div className={s.payments}>
          <Paypal width={96} height={64} onClick={() => paypalHandler('PAYPAL')} />
          <Typography variant={'regular14'}>Or</Typography>
          <Stripe width={96} height={64} onClick={() => paypalHandler('STRIPE')} />
        </div>
      </div>
    </div>
  )
}
