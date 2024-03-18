import { GetProfileResponse } from '@/entities/profile'

export type GetUsersArgsType = {
  search?: string
  pageSize?: number
  pageNumber?: number
  cursor: number
}

type GetUsersResponseItems = Omit<GetProfileResponse, 'city' | 'dateOfBirth' | 'aboutMe'>

export type GetUsersResponse = {
  items: GetUsersResponseItems[]
  page: number
  pageSize: number
  pagesCount: number
  nextCursor: number
  prevCursor: number
  totalCount: number
}

export type GetUserResponse = Omit<GetProfileResponse, 'createdAt'> & {
  isFollowing: boolean
  isFollowedBy: boolean
  followingCount: number
  followersCount: number
  publicationsCount: number
}
