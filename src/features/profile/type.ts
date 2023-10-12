export type ProfileUpdateType = {
  userName: string
  firstName: string
  lastName: string
  city: string
  dateOfBirth: string
  aboutMe: string
}

export type Avatars = {
  url: string
  width: number
  height: number
  fileSize: number
}

export type AvatarRequestType = {
  avatars: Avatars[]
}
