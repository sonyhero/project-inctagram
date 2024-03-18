import { ImageType } from '@/entities'

export type GetProfileResponse = {
  id: number
  userName: string
  firstName: string
  lastName: string
  city: string
  dateOfBirth: Date
  aboutMe: string
  avatars: ImageType[]
  createdAt: Date
}

export type UpdateProfileArg = Omit<GetProfileResponse, 'id' | 'avatars' | 'createdAt'>
export type UploadAvatarResponse = {
  avatars: ImageType[]
}
