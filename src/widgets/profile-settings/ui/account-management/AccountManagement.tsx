import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import s from './AccountManagement.module.scss'
import { AccountTypeOptions, SubscriptionOptionsType } from './AccountManagement.types'
import { CurrentSubscription } from './current-subscription'

import {
  useCostOfSubscriptionsQuery,
  useCreateSubscriptionMutation,
  useCurrentSubscriptionsQuery,
} from '@/entities/subscription/api/subscriptionApi'
import { SubscriptionDurationType } from '@/entities/subscription/api/subscriptionApi.types'
import { SubscriptionModal } from '@/features/modal/ui/subscription-modal'
import { Nullable } from '@/shared/types'
import { Paypal, Stripe, Typography } from '@/shared/ui'
import { RadioGroupDemo } from '@/shared/ui/radio-group'

const accountTypeOptions: AccountTypeOptions[] = [
  { id: -1, value: 'Personal' },
  { id: -2, value: 'Business' },
]

export const AccountManagement = () => {
  const { query } = useRouter()
  const isSuccess = query.success === 'true'
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [createSub] = useCreateSubscriptionMutation()
  const { data: currentSubscriptions } = useCurrentSubscriptionsQuery()
  const { data: coastData, isLoading } = useCostOfSubscriptionsQuery()
  const [accountTypeId, setAccountTypeId] = useState<number>(accountTypeOptions[0].id)
  const [subscriptionId, setSubscriptionId] = useState<number>(0)
  const [subscriptionOptions, setSubscriptionOptions] =
    useState<Nullable<SubscriptionOptionsType[]>>(null)

  const closeModal = () => {
    setIsOpenModal(false)
  }

  useEffect(() => {
    if (query.success) {
      setIsOpenModal(true)
    }
  }, [query.success])
  const isBusiness = accountTypeId === -2 && subscriptionOptions

  useEffect(() => {
    if (currentSubscriptions && currentSubscriptions.data.length > 0) {
      setAccountTypeId(accountTypeOptions[1].id)
    }
  }, [currentSubscriptions, accountTypeId])
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

  return isLoading ? (
    <div>loader</div>
  ) : (
    <div className={s.accountManagement}>
      <CurrentSubscription />
      <Typography variant={'h3'} className={s.radioHead}>
        Account type:
      </Typography>
      <div className={s.radioGroup}>
        <RadioGroupDemo
          value={accountTypeId}
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
      {isLoading && !subscriptionOptions && (
        <Typography variant={'h3'}>
          Subscriptions are currently unavailable, please try again later
        </Typography>
      )}
      <SubscriptionModal open={isOpenModal} onClose={closeModal} isSuccess={isSuccess} />
    </div>
  )
}
