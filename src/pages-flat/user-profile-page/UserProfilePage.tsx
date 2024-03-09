import React from 'react'

import { useRouter } from 'next/router'

import s from './UserProfilePage.module.scss'

import { Posts } from '@/entities/posts/ui/Posts'
import { ProfileHeader } from '@/widgets/profile-header'

export const UserProfilePage = () => {
  const { query } = useRouter()
  const profileId = Number(query.userId?.[0])
  const postId = Number(query.userId?.[1])
  const scrollableID = 'scrollableID'

  return (
    <div id={scrollableID} className={s.userProfile}>
      <ProfileHeader profileId={profileId} />
      <Posts userId={profileId} postId={postId} scrollableID={scrollableID} />
    </div>
  )
}
