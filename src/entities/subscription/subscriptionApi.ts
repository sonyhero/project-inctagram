import {
  CostOfSubscriptionsType,
  CurrentSubscriptionType,
  MyPaymentsType,
  SubscriptionType,
} from '@/entities/subscription/subscriptionApi.types'
import { baseApi } from '@/shared/api'

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createSubscription: builder.mutation<{ url: string }, SubscriptionType>({
        query: body => ({
          url: `v1/subscriptions`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Subscriptions'],
      }),
      canceledAutoRenewal: builder.mutation<void, void>({
        query: () => ({
          url: `v1/subscriptions/canceled-auto-renewal`,
          method: 'POST',
        }),
        invalidatesTags: ['Subscriptions'],
      }),
      currentSubscriptions: builder.query<CurrentSubscriptionType, void>({
        query: () => ({
          url: `v1/subscriptions/current-subscriptions`,
          method: 'GET',
        }),
        providesTags: ['Subscriptions'],
      }),
      costOfSubscriptions: builder.query<CostOfSubscriptionsType, void>({
        query: () => ({
          url: `v1/subscriptions/cost-of-subscriptions`,
          method: 'GET',
        }),
        providesTags: ['Subscriptions'],
      }),
      myPayments: builder.query<MyPaymentsType[], void>({
        query: () => ({
          url: `v1/subscriptions/my-payments`,
          method: 'GET',
        }),
        providesTags: ['Subscriptions'],
      }),
    }
  },
})

export const {
  useCreateSubscriptionMutation,
  useCurrentSubscriptionsQuery,
  useCostOfSubscriptionsQuery,
  useCanceledAutoRenewalMutation,
  useMyPaymentsQuery,
} = subscriptionApi
