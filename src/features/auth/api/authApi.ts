import {
  AuthLoginResponseType,
  CheckRecoveryCodeResponseType,
  CheckRecoveryCodeType,
  GoogleLoginType,
  LoginType,
  MeResponseType,
  NewPasswordType,
  RecoveryPasswordType,
  ResendVerificationEmailType,
  SignUpType,
  VerificationEmailType,
} from '@/features/auth'
import { baseApi } from '@/shared/api'
import { Nullable } from '@/shared/types'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      signUp: builder.mutation<void, SignUpType>({
        query: body => ({
          url: 'v1/auth/registration',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['Me'],
      }),
      verificationEmail: builder.mutation<void, VerificationEmailType>({
        query: body => ({
          url: 'v1/auth/registration-confirmation',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['Me'],
      }),
      resendVerificationEmail: builder.mutation<void, ResendVerificationEmailType>({
        query: body => ({
          url: 'v1/auth/registration-email-resending',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['Me'],
      }),
      login: builder.mutation<AuthLoginResponseType, LoginType>({
        query: body => ({
          url: 'v1/auth/login',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['Me'],
      }),
      logout: builder.mutation<void, void>({
        query: body => ({
          url: 'v1/auth/logout',
          method: 'POST',
          body: body,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            authApi.util.updateQueryData('me', undefined, () => {
              return null
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        invalidatesTags: ['Me'],
      }),
      recoveryPassword: builder.mutation<void, RecoveryPasswordType>({
        query: body => ({
          url: 'v1/auth/password-recovery',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['Me'],
      }),
      checkRecoveryCode: builder.mutation<CheckRecoveryCodeResponseType, CheckRecoveryCodeType>({
        query: body => ({
          url: 'v1/auth/check-recovery-code',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['Me'],
      }),
      newPassword: builder.mutation<void, NewPasswordType>({
        query: body => ({
          url: `v1/auth/new-password/`,
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['Me'],
      }),
      // me: builder.query<Nullable<MeResponseType>, void>({
      //   query: () => ({
      //     url: 'v1/auth/me',
      //     method: 'GET',
      //   }),
      //   extraOptions: { maxRetries: 0 },
      //   providesTags: ['Me'],
      // }),

      //Взял реализацию запроса 'me' из группы по стажировке в ТГ, есть скриншоты у @o_an_ton
      me: builder.query<Nullable<MeResponseType>, void>({
        async queryFn(_name, _api, _extraOptions, baseQuery) {
          const result = await baseQuery({
            url: 'v1/auth/me',
            method: 'GET',
          })

          return {
            data:
              result.data === undefined
                ? ('' as unknown as MeResponseType)
                : (result.data as MeResponseType),
          }
        },
        extraOptions: { maxRetries: 1 },
        providesTags: ['Me'],
      }),
      //
      googleLogin: builder.mutation<GoogleLoginType, { code: string }>({
        query: body => ({
          url: 'v1/auth/google/login',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Me'],
      }),
      githubLogin: builder.query<void, void>({
        query: () => ({
          url: 'v1/auth/github/login',
          method: 'GET',
        }),
      }),
    }
  },
})

export const {
  useMeQuery,
  useLazyMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useResendVerificationEmailMutation,
  useVerificationEmailMutation,
  useCheckRecoveryCodeMutation,
  useNewPasswordMutation,
  useRecoveryPasswordMutation,
  useGoogleLoginMutation,
  useLazyGithubLoginQuery,
  useGithubLoginQuery,
} = authApi
