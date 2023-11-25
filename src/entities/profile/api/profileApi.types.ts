export type GetProfileResponse = {
  id: number
  userName: string
  firstName: string
  lastName: string
  city: string
  dateOfBirth: Date
  aboutMe: string
  avatars: Avatar[]
  createdAt: Date
}
export type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
}
export type UpdateProfileArg = Omit<GetProfileResponse, 'id' | 'avatars' | 'createdAt'>
export type UploadAvatarResponse = {
  avatars: Avatar[]
}
