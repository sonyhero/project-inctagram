import {
  GetAllPublicPostsArgs,
  GetPublicPostsResponse,
  GetPublicUserProfileByIdResponse,
  GetUserPublicPostsArgs,
  PostArgsType,
  PostsImagesResponse,
  PostsResponseType,
  UploadIdType,
} from '@/entities/posts'
import { baseApi } from '@/shared/api'

const postsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createPost: builder.mutation<PostsResponseType, PostArgsType>({
        query: body => ({
          url: `v1/posts`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Posts'],
      }),
      uploadPostImage: builder.mutation<PostsImagesResponse, FormData>({
        query: body => ({
          url: `v1/posts/image`,
          method: 'POST',
          body,
        }),
        invalidatesTags: [],
      }),
      deletePostImage: builder.mutation<void, UploadIdType>({
        query: ({ uploadId }) => ({
          url: `v1/posts/image/${uploadId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Posts'],
      }),
      updatePostById: builder.mutation<void, { postId: number; description: string }>({
        query: ({ postId, description }) => ({
          url: `v1/posts/${postId}`,
          method: 'PUT',
          body: { description },
        }),
        invalidatesTags: ['Posts'],
      }),
      deletePostById: builder.mutation<void, { postId: number }>({
        query: ({ postId }) => ({
          url: `v1/posts/${postId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Posts'],
      }),
      getAllPublicPosts: builder.query<GetPublicPostsResponse, GetAllPublicPostsArgs>({
        query: args => ({
          url: `v1/public-posts/all/${args.endCursorPostId}`,
          method: 'GET',
          params: {
            pageSize: args.pageSize,
            sortBy: args.sortBy,
            sortDirection: args.sortDirection,
          },
        }),
        providesTags: ['Posts'],
      }),
      getUserPublicPosts: builder.query<GetPublicPostsResponse, GetUserPublicPostsArgs>({
        query: args => ({
          url: `v1/public-posts/user/${args.userId}/${args.endCursorPostId}`,
          method: 'GET',
          params: {
            pageSize: args.pageSize,
            sortBy: args.sortBy,
            sortDirection: args.sortDirection,
          },
        }),
        providesTags: ['Posts'],
      }),
      getPublicPostById: builder.query<PostsResponseType, { postId: number }>({
        query: ({ postId }) => ({
          url: `v1/public-posts/${postId}`,
          method: 'GET',
        }),
        providesTags: [],
      }),
      getPublicUserProfileById: builder.query<
        GetPublicUserProfileByIdResponse,
        { profileId: number }
      >({
        query: ({ profileId }) => ({
          url: `v1/public-user/profile/${profileId}`,
          method: 'GET',
        }),
        providesTags: [],
      }),
    }
  },
})

export const {
  useCreatePostMutation,
  useUploadPostImageMutation,
  useUpdatePostByIdMutation,
  useDeletePostByIdMutation,
  useGetPublicUserProfileByIdQuery,
  useGetUserPublicPostsQuery,
  useLazyGetUserPublicPostsQuery,
  useGetPublicPostByIdQuery,
  useLazyGetPublicPostByIdQuery,
  util: { getRunningQueriesThunk },
} = postsApi

//export endpoints for use in SSR
export const { getUserPublicPosts, getPublicUserProfileById, getPublicPostById } =
  postsApi.endpoints
