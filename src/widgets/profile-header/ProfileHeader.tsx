import React from 'react'

import { useRouter } from 'next/router'

import s from './ProfileHeader.module.scss'

import { Avatar } from '@/entities'
import { useGetProfileQuery } from '@/entities/profile'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks'
import { useAppSelector } from '@/shared/store'
import { Button, Typography } from '@/shared/ui'
import { ProfileStatistic } from '@/widgets/profile-statistic'

export const ProfileHeader = () => {
  const { data: profileData } = useGetProfileQuery()
  const { t } = useTranslation()
  const { push } = useRouter()
  const showProfileSettingsHandler = () => {
    push(PATH.MY_PROFILE_SETTINGS_GENERAL)
  }

  const publicationCount = useAppSelector(state => state.postsSlice.publicationCount)

  return (
    <div className={s.profileHeader}>
      <div className={s.photoBlock}>
        <Avatar className={s.photo} />
      </div>
      <div className={s.profileDescription}>
        <div className={s.nameAndSettings}>
          <Typography variant={'h1'}>{profileData?.userName}</Typography>
          <Button variant={'secondary'} onClick={showProfileSettingsHandler}>
            {t.myProfile.profilePage.profileSettings}
          </Button>
        </div>
        <ProfileStatistic postsCount={publicationCount} aboutMe={profileData?.aboutMe} />
      </div>
    </div>
  )
}
