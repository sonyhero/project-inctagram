import { GetAllPublicPostsArgs } from '@/entities'

export type GetNotificationsArgsType = Omit<GetAllPublicPostsArgs, 'endCursorPostId'> & {
  cursor?: number
}

export type GetNotificationsResponseType = {
  pageSize: number
  totalCount: number
  items: NotificationType[]
}

export type NotificationType = {
  id: number
  message: string
  isRead: boolean
  notifyAt: Date
}
