export type PostArgsType = {
  description: string
  childrenMetadata: UploadIdType[]
}
export type UploadIdType = {
  uploadId: string
}
export type PostsResponseType = {
  id: number
  userName: string
  description: string
  location: string
  images: PostsImagesResponseType[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: {
    firstName: string
    lastName: string
  }
}
export type ImageType = {
  url: string
  width: number
  height: number
  fileSize: number
}
export type PostsImagesResponseType = ImageType & UploadIdType

export type GetAllPublicPostsArgs = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
export type GetUserPublicPostsArgs = GetAllPublicPostsArgs & {
  userId: number
}

export type GetPublicUserProfileByIdResponse = {
  id: number
  userName: string
  aboutMe: string
  avatars: ImageType[]
}

export type GetPublicPostsResponse = {
  totalCount: number
  pageSize: number
  totalUsers: number
  items: PostsResponseType[]
}
export type PostsImagesResponse = {
  images: PostsImagesResponseType[]
}
