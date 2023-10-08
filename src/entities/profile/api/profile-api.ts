import {
  GetProfileResponse,
  UpdateProfileArg,
  UploadAvatarResponse,
} from '@/entities/profile/api/types'
import { baseApi } from '@/shared'

const profileApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getProfile: builder.query<GetProfileResponse, number>({
        query: body => ({
          url: `v1/users/profile/${body}`,
          method: 'GET',
        }),
      }),
      updateProfile: builder.query<any, UpdateProfileArg>({
        query: body => ({
          url: `v1/users/profile`,
          method: 'PUT',
          body,
        }),
      }),
      deleteProfile: builder.mutation<void, void>({
        query: body => ({
          url: `users/profile`,
          method: 'DELETE',
          body,
        }),
      }),
      uploadAvatar: builder.mutation<UploadAvatarResponse, any>({
        query: body => ({
          url: `users/profile/avatar`,
          method: 'POST',
          body,
        }),
      }),
      deleteAvatar: builder.mutation<void, void>({
        query: body => ({
          url: `users/profile/avatar`,
          method: 'DELETE',
          body,
        }),
      }),
    }
  },
})

export const {
  useGetProfileQuery,
  useUpdateProfileQuery,
  useDeleteProfileMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} = profileApi
