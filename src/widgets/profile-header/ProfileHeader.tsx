import React from 'react'

import { useRouter } from 'next/router'

import s from './ProfileHeader.module.scss'

import { useGetPublicUserProfileByIdQuery } from '@/entities'
import { AvatarOwner } from '@/entities/avatar-owner'
import { useMeQuery } from '@/features/auth'
import { useFollowingUserMutation, useGetUserQuery } from '@/features/following/api'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks'
import { Button, Typography } from '@/shared/ui'
import { ProfileStatistic } from '@/widgets/profile-statistic'

type Props = {
  profileId: number
}

export const ProfileHeader = ({ profileId }: Props) => {
  const { data: profileData } = useGetPublicUserProfileByIdQuery({ profileId })

  const { data: userData, isSuccess } = useGetUserQuery({ userName: profileData?.userName })
  const [followUser, { isLoading: isLoadingFollow }] = useFollowingUserMutation()

  const { data: meData } = useMeQuery()
  const isMe = meData ? meData.userId === profileId : false

  const { t } = useTranslation()
  const { push } = useRouter()
  const showProfileSettingsHandler = () => {
    push(PATH.MY_PROFILE_SETTINGS_GENERAL)
  }

  const followingUserHandler = () => {
    followUser({ selectedUserId: profileId })
  }

  return (
    <div className={s.profileHeader}>
      <div className={s.photoBlock}>
        <AvatarOwner width={192} height={192} avatarOwner={profileData?.avatars[0]?.url} />
      </div>
      <div className={s.profileDescription}>
        <div className={s.nameAndSettings}>
          <Typography variant={'h1'}>{profileData?.userName}</Typography>
          {isSuccess && (
            <Button
              disabled={isLoadingFollow}
              variant={userData?.isFollowing ? 'outline' : 'primary'}
              onClick={followingUserHandler}
            >
              {userData?.isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          )}
          {isMe && (
            <Button variant={'secondary'} onClick={showProfileSettingsHandler}>
              {t.myProfile.profilePage.profileSettings}
            </Button>
          )}
        </div>
        <ProfileStatistic userName={profileData?.userName} aboutMe={profileData?.aboutMe} />
      </div>
    </div>
  )
}
