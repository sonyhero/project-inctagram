export type SubscriptionType = {
  typeSubscription: 'MONTHLY' | 'DAY' | 'WEEKLY'
  paymentType: string
  amount: number
  baseUrl: string
}
export type CurrentSubscriptionType = {
  data: CurrentSubscriptionTypeData[]
  hasAutoRenewal: boolean
}
export type CurrentSubscriptionTypeData = {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  autoRenewal: boolean
}

export type CostOfSubscriptionsType = {
  data: CostOfSubscriptionsData[]
}
export type CostOfSubscriptionsData = {
  amount: number
  typeDescription: string
}

export type MyPaymentsType = {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  price: number
  subscriptionType: 'MONTHLY' | 'DAY' | 'WEEKLY'
  paymentType: 'STRIPE' | 'PAYPAL'
}
