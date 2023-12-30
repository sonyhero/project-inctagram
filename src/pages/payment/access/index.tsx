import { useEffect } from 'react'

import { useRouter } from 'next/router'

import {
  PaymentType,
  setIsSuccessPayPalPayment,
  setOpenPaymentModal,
  setPayment,
} from '@/entities/subscription/model/subscriptionSlice'
import { useMeQuery } from '@/features/auth'
import { PATH } from '@/shared/config/routes'
import { getBaseLayout } from '@/shared/providers'
import { useAppDispatch } from '@/shared/store'

const PaymentAccessPage = () => {
  const { data, isLoading } = useMeQuery()
  const { push, query } = useRouter()
  const dispatch = useAppDispatch()

  const token = query.token

  useEffect(() => {
    const payload = query as PaymentType

    dispatch(setOpenPaymentModal(true))
    if (token) {
      dispatch(setPayment(payload))

      dispatch(setIsSuccessPayPalPayment(true))
    } else {
      dispatch(setIsSuccessPayPalPayment(false))
    }
  }, [token])

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (!data) {
    push(PATH.SIGN_IN)

    return
  }

  push(PATH.MY_PROFILE_SETTINGS_ACCOUNT_MANAGEMENT)

  return <div></div>
}

export default PaymentAccessPage
PaymentAccessPage.getLayout = getBaseLayout
