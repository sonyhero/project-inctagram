import { useEffect, useState } from 'react'

import s from './AccountManagement.module.scss'
import { SubscriptionOptionsType } from './AccountManagement.types'
import { CurrentSubscription } from './current-subscription'

import {
  useCostOfSubscriptionsQuery,
  useCreateSubscriptionMutation,
  useCurrentSubscriptionsQuery,
} from '@/entities/subscription/api/subscriptionApi'
import { SubscriptionDurationType } from '@/entities/subscription/api/subscriptionApi.types'
import { setOpenPaymentModal } from '@/entities/subscription/model/subscriptionSlice'
import { SubscriptionModal } from '@/features/modal/ui/subscription-modal'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import { Paypal, Stripe, Typography } from '@/shared/ui'
import { RadioGroupDemo } from '@/shared/ui/radio-group'

export const AccountManagement = () => {
  const { data: currentSubscriptions } = useCurrentSubscriptionsQuery()
  const { data: coastData, isLoading } = useCostOfSubscriptionsQuery()
  const [createSub] = useCreateSubscriptionMutation()

  const dispatch = useAppDispatch()
  const isSuccessPaypal = useAppSelector(
    state => state.subscriptionSlice.payment.isSuccessPayPalPayment
  )
  const isSuccessStripe = useAppSelector(
    state => state.subscriptionSlice.payment.isSuccessStripePayment
  )

  const accountTypeOptions = useAppSelector(state => state.subscriptionSlice.accountTypeOptions)
  const isOpenModal = useAppSelector(state => state.subscriptionSlice.payment.isOpenModal)

  const [accountTypeId, setAccountTypeId] = useState<number>(accountTypeOptions[0].id)
  const [subscriptionId, setSubscriptionId] = useState<number>(0)
  const [subscriptionOptions, setSubscriptionOptions] =
    useState<Nullable<SubscriptionOptionsType[]>>(null)

  const isSuccessPayment = isSuccessPaypal || isSuccessStripe
  const businessAccountTypeId = accountTypeOptions.find(option => option.value === 'Business')?.id

  const isBusiness = accountTypeId === businessAccountTypeId && subscriptionOptions

  const closeModal = () => {
    dispatch(setOpenPaymentModal(false))
  }

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
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? '',
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
      <SubscriptionModal open={isOpenModal} onClose={closeModal} isSuccess={isSuccessPayment} />
    </div>
  )
}
