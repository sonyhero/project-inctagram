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
}
export type PostsResponseTypeImages = {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}
export type GetDecksArgs = {
  idLastUploadedPost?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
export type GetAllPosts = {
  totalCount: number
  pageSize: number
  items: GetAllPostsItems[]
}
export type GetAllPostsItemsImages = {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}
export type GetAllPostsItems = {
  id: number
  description: string
  location: string
  images: GetAllPostsItemsImages[]
  createdAt: string
  updatedAt: string
  ownerId: number
}
export type PostsImagesResponse = {
  images: PostsImagesResponseImages[]
}
export type PostsImagesResponseImages = {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}
