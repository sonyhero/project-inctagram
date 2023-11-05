import {
  GetAllPosts,
  GetDecksArgs,
  PostArgsType,
  PostsImagesResponse,
  PostsResponseType,
} from '@/entities/profile/api/postsApi.types'
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
        invalidatesTags: ['Posts'],
      }),
      uploadPostImage: builder.mutation<PostsImagesResponse, FormData>({
        query: body => ({
          url: `v1/posts/image`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Posts'],
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
          url: `v1/posts/user`,
          method: 'GET',
          params: args,
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
        invalidatesTags: ['Posts'],
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
  useGetPostsByUserIdQuery,
  useUpdatePostByIdMutation,
  useDeletePostByIdMutation,
} = postsApi
