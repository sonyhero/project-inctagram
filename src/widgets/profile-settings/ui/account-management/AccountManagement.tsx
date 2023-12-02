import { useState } from 'react'

import s from './AccountManagement.module.scss'

import { useCreateSubscriptionMutation } from '@/entities/subscription/subscriptionApi'
import { CheckBox, Paypal, Stripe, Typography } from '@/shared/ui'
import { RadioGroupDemo } from '@/shared/ui/radio-group'

const accountTypeOptions = [
  { id: 1, value: 'Personal' },
  { id: 2, value: 'Business' },
]

const subscriptionOptions = [
  { id: 1, value: '$10 per 1 Day', amount: 10 },
  { id: 2, value: '$50 per 7 Day', amount: 50 },
  { id: 3, value: '$100 per month', amount: 100 },
]

export const AccountManagement = () => {
  const [createSub] = useCreateSubscriptionMutation()

  const [accountType, setAccountType] = useState(accountTypeOptions[0].id)
  const [subscriptionAmount, setSubscriptionAmount] = useState(subscriptionOptions[0].id)

  const paypalHandler = () => {
    createSub({
      typeSubscription: 'MONTHLY',
      paymentType: 'STRIPE',
      amount: 100,
      baseUrl: 'https://localhost:3000/my-profile',
    })
  }

  return (
    <div className={s.accountManagement}>
      <Typography variant={'h3'}>Current Subscription:</Typography>
      <div>
        <div>
          <Typography color={'secondary'} variant={'regular14'}>
            Expire at
          </Typography>
          <Typography variant={'medium14'}>01.12.2023</Typography>
        </div>
        <div>
          <Typography color={'secondary'} variant={'regular14'}>
            Next payment
          </Typography>
          <Typography variant={'medium14'}>13.02.2024</Typography>
        </div>
        <CheckBox label={'Auto-Renewal'} />
      </div>
      <Typography variant={'h3'}>Account type:</Typography>
      <RadioGroupDemo options={accountTypeOptions} onChangeOption={setAccountType} />
      {accountType === 2 && (
        <div>
          <Typography variant={'h3'}>Your subscription costs:</Typography>
          <RadioGroupDemo options={subscriptionOptions} onChangeOption={setSubscriptionAmount} />
        </div>
      )}
      <div className={s.paymentsBlock}>
        <div className={s.payments}>
          <Paypal width={96} height={64} onClick={paypalHandler} />
          <Typography variant={'regular14'}>Or</Typography>
          <Stripe width={96} height={64} />
        </div>
      </div>
    </div>
  )
}
