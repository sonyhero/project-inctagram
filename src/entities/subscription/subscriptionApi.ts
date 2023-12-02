import { baseApi } from '@/shared/api'

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createSubscription: builder.mutation<any, any>({
        query: body => ({
          url: `v1/subscriptions`,
          method: 'POST',
          body,
        }),
      }),
    }
  },
})

export const { useCreateSubscriptionMutation } = subscriptionApi
