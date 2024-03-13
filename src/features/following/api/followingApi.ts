import {
  GetUserResponse,
  GetUsersArgsType,
  GetUsersResponse,
} from '@/features/following/api/followingApi.types'
import { baseApi } from '@/shared/api'

export const followingApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getUsers: builder.query<GetUsersResponse, GetUsersArgsType>({
        query: params => ({
          url: `v1/users`,
          method: 'GET',
          params,
        }),
      }),
      deleteUsersFollower: builder.mutation<any, { userId: string | undefined }>({
        query: ({ userId }) => ({
          url: `v1/users/follower/${userId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['User', 'Followers'],
      }),
      followingUser: builder.mutation<any, { selectedUserId: number }>({
        query: body => ({
          url: `v1/users/following`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['User', 'Following'],
      }),
      getUser: builder.query<GetUserResponse, { userName: string | undefined }>({
        query: ({ userName }) => ({
          url: `v1/users/${userName}`,
          method: 'GET',
        }),
        providesTags: ['User'],
      }),
      getUserFollowers: builder.query<any, { userName: string } & GetUsersArgsType>({
        query: ({ userName, ...params }) => ({
          url: `v1/users/${userName}/followers`,
          method: 'GET',
          params,
        }),
        providesTags: ['Followers'],
      }),
      getUserFollowing: builder.query<any, { userName: string } & GetUsersArgsType>({
        query: ({ userName, ...params }) => ({
          url: `v1/users/${userName}/following`,
          method: 'GET',
          params,
        }),
        providesTags: ['Following'],
      }),
    }
  },
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useFollowingUserMutation,
  useDeleteUsersFollowerMutation,
  useLazyGetUserFollowersQuery,
} = followingApi
