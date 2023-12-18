import { GetProfileResponse } from '@/entities/profile'

export type PostArgsType = {
  description: string
  childrenMetadata: PostArgsTypeChildrenMetadata[]
}
export type PostArgsTypeChildrenMetadata = {
  uploadId: string
}
export type PostsResponseType = {
  id: number
  description: string
  location: string
  images: PostsResponseTypeImages[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: {
    firstName: string
    lastName: string
  }
}
export type PostsResponseTypeImages = {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}
export type GetAllPostsArgs = {
  idLastUploadedPost?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
export type GetUserAllPostsArgs = {
  userId: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
export type GetPublicPosts = {
  profile: GetProfileResponse
  posts: PostsResponseType
}
export type GetUsersAllPosts = {
  profile: GetProfileResponse
  posts: GetAllPosts
}
export type GetAllPosts = {
  totalCount: number
  pageSize: number
  totalUsers: number
  items: PostsResponseType[]
}
export type PostsImagesResponse = {
  images: PostsResponseTypeImages[]
}
