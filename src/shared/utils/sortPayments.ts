import { MyPaymentsType } from '@/entities/subscription/api'

export const comparePaymentDates = (paymentA: MyPaymentsType, paymentB: MyPaymentsType) => {
  const dateA = new Date(paymentA.dateOfPayment)
  const dateB = new Date(paymentB.dateOfPayment)

  return dateB.getTime() - dateA.getTime()
}
