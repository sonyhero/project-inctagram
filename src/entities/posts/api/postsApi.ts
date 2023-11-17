import {
  GetAllPosts,
  GetDecksArgs,
  GetPublicPosts,
  GetUserDecksArgs,
  GetUsersAllPosts,
  PostArgsType,
  PostsImagesResponse,
  PostsResponseType,
} from '@/entities/posts'
import { baseApi } from '@/shared/api'

const postsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getAllPosts: builder.query<GetAllPosts, GetDecksArgs>({
        query: args => ({
          url: `v1/posts/all`,
          method: 'GET',
          params: args,
        }),
        providesTags: ['Posts'],
      }),
      createPost: builder.mutation<PostsResponseType, PostArgsType>({
        query: body => ({
          url: `v1/posts`,
          method: 'POST',
          body,
        }),
        invalidatesTags: [],
      }),
      uploadPostImage: builder.mutation<PostsImagesResponse, FormData>({
        query: body => ({
          url: `v1/posts/image`,
          method: 'POST',
          body,
        }),
        invalidatesTags: [],
      }),
      deletePostImage: builder.mutation<void, { uploadId: string }>({
        query: body => ({
          url: `v1/posts/image/${body.uploadId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Posts'],
      }),
      getPostById: builder.query<PostsResponseType, { postId: number }>({
        query: args => ({
          url: `v1/posts/p/${args.postId}`,
          method: 'GET',
        }),
        providesTags: [],
      }),
      getPostsByUserId: builder.query<GetAllPosts, GetDecksArgs>({
        query: args => ({
          url: `v1/posts/user/${args.idLastUploadedPost}`,
          method: 'GET',
          params: {
            pageSize: args.pageSize,
            sortBy: args.sortBy,
            sortDirection: args.sortDirection,
          },
        }),
        providesTags: ['Posts'],
      }),
      updatePostById: builder.mutation<void, { postId: number; description: string }>({
        query: body => ({
          url: `v1/posts/${body.postId}`,
          method: 'PUT',
          body: { description: body.description },
        }),
        invalidatesTags: ['Posts'],
      }),
      deletePostById: builder.mutation<void, { postId: number }>({
        query: body => ({
          url: `v1/posts/${body.postId}`,
          method: 'DELETE',
        }),
        invalidatesTags: [],
      }),
      getPublicPostById: builder.query<GetPublicPosts, { postId: number }>({
        query: args => ({
          url: `v1/public-posts/p/${args.postId}`,
          method: 'GET',
        }),
        providesTags: [],
      }),
      getPublicPostsByUserId: builder.query<GetUsersAllPosts, GetUserDecksArgs>({
        query: args => ({
          url: `v1/public-posts/user/${args.userId}`,
          method: 'GET',
          params: {
            pageSize: args.pageSize,
            sortBy: args.sortBy,
            sortDirection: args.sortDirection,
          },
        }),
        providesTags: ['Posts'],
      }),
    }
  },
})

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useUploadPostImageMutation,
  useDeletePostImageMutation,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
  useUpdatePostByIdMutation,
  useDeletePostByIdMutation,
  useGetPostsByUserIdQuery,
  useLazyGetPostsByUserIdQuery,
  useGetPublicPostByIdQuery,
  useGetPublicPostsByUserIdQuery,
  util: { getRunningQueriesThunk: getPostsRunningQueriesThunk },
} = postsApi

//export endpoints for use in SSR
export const { getAllPosts, getPublicPostsByUserId, getPublicPostById } = postsApi.endpoints
