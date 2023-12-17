import { useEffect } from 'react'

import { useRouter } from 'next/router'

import {
  setIsSuccessStripePayment,
  setOpenPaymentModal,
} from '@/entities/subscription/model/subscriptionSlice'
import { useMeQuery } from '@/features/auth'
import { PATH } from '@/shared/config/routes'
import { getSettingsLayout } from '@/shared/providers/settings-layout'
import { useAppDispatch } from '@/shared/store'

const EditPage = () => {
  const { data, isLoading } = useMeQuery()
  const { push, query } = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setOpenPaymentModal(true))
    switch (query.success) {
      case 'true':
        debugger
        dispatch(setIsSuccessStripePayment(true))
        break
      case 'false':
        dispatch(setIsSuccessStripePayment(false))
        break
      default:
        debugger
        dispatch(setIsSuccessStripePayment(false))
        break
    }
  }, [query.success])

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

export default EditPage
EditPage.getLayout = getSettingsLayout
