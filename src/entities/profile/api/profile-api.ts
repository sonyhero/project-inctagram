import {
  GetProfileResponse,
  UpdateProfileArg,
  UploadAvatarResponse,
} from '@/entities/profile/api/types'
import { baseApi } from '@/shared/api'

const profileApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getProfile: builder.query<GetProfileResponse, number>({
        query: body => ({
          url: `v1/users/profile/${body}`,
          method: 'GET',
        }),
        providesTags: ['Profile'],
      }),
      updateProfile: builder.mutation<void, UpdateProfileArg>({
        query: body => ({
          url: `v1/users/profile`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: ['Profile'],
      }),
      deleteProfile: builder.mutation<void, void>({
        query: () => ({
          url: `v1/users/profile`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Profile'],
      }),
      uploadAvatar: builder.mutation<UploadAvatarResponse, FormData>({
        query: body => ({
          url: `v1/users/profile/avatar`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Profile'],
      }),
      deleteAvatar: builder.mutation<void, void>({
        query: () => ({
          url: `v1/users/profile/avatar`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Profile'],
      }),
    }
  },
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} = profileApi
