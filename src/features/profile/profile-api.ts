import { AvatarRequestType, ProfileUpdateType } from '@/features/profile/type'
import { baseApi } from '@/shared'

const profileApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getProfile: builder.query<AvatarRequestType, { profileId: number }>({
        query: profileId => ({
          url: `v1/users/profile/${profileId}`,
          method: 'GET',
        }),
        providesTags: ['Profile'],
      }),
      updateProfile: builder.mutation<void, ProfileUpdateType>({
        query: body => ({
          url: 'v1/users/profile',
          method: 'PUT',
          body: body,
        }),
        invalidatesTags: ['Profile'],
      }),
      deleteProfile: builder.mutation<void, void>({
        query: () => ({
          url: '/v1/users/profile',
          method: 'DELETE',
        }),
        invalidatesTags: ['Profile'],
      }),
      createAvatar: builder.mutation<AvatarRequestType, { file: File }>({
        query: body => ({
          url: '/v1/users/profile/avatar',
          method: 'POST',
          body: body,
        }),
        invalidatesTags: ['Profile'],
      }),
      deleteAvatar: builder.mutation<void, void>({
        query: () => ({
          url: 'v1/users/profile/avatar',
          method: 'DELETE',
        }),
        invalidatesTags: ['Profile'],
      }),
    }
  },
})

export const {
  useCreateAvatarMutation,
  useDeleteAvatarMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
} = profileApi
