import { CommentsResponseType } from './commentsApi.types'

import { baseApi } from '@/shared/api'

export const commentsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      addComment: builder.mutation<CommentsResponseType, { postId: number; content: string }>({
        query: ({ postId, ...body }) => ({
          url: `v1/posts/${postId}/comments`,
          method: 'POST',
          body,
        }),
      }),
    }
  },
})

export const { useAddCommentMutation } = commentsApi
