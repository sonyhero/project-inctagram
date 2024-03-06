import { ImageType } from '@/entities'

export type CommentsResponseType = {
  id: number
  postId: number
  from: {
    id: number
    username: string
    avatars: ImageType[]
  }
  content: string
  createdAt: Date
}
