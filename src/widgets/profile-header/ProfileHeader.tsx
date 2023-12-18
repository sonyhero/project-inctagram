import React from 'react'

import { useRouter } from 'next/router'

import s from './ProfileHeader.module.scss'

import { Avatar } from '@/entities'
import { useGetProfileQuery } from '@/entities/profile'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks'
import { useAppSelector } from '@/shared/store'
import { Button, Typography } from '@/shared/ui'

type Props = {
  userId: number
}

export const ProfileHeader = ({ userId }: Props) => {
  const { data: profileData } = useGetProfileQuery(userId)
  const { t } = useTranslation()
  const { push } = useRouter()
  const showProfileSettingsHandler = () => {
    push(PATH.MY_PROFILE_SETTINGS_GENERAL)
  }

  const publicationCount = useAppSelector(state => state.postsSlice.publicationCount)

  return (
    <div className={s.profileHeader}>
      <div className={s.photoBlock}>
        <Avatar userId={userId} className={s.photo} />
      </div>
      <div className={s.profileDescription}>
        <div className={s.nameAndSettings}>
          <Typography variant={'h1'}>{profileData?.userName}</Typography>
          <Button variant={'secondary'} onClick={showProfileSettingsHandler}>
            {t.myProfile.profilePage.profileSettings}
          </Button>
        </div>
        <div className={s.statistic}>
          <div>
            <Typography variant={'bold14'}>0</Typography>
            <Typography variant={'regular14'}>{t.myProfile.profilePage.following}</Typography>
          </div>
          <div>
            <Typography variant={'bold14'}>0</Typography>
            <Typography variant={'regular14'}>{t.myProfile.profilePage.followers}</Typography>
          </div>
          <div>
            <Typography variant={'bold14'}>{publicationCount}</Typography>
            <Typography variant={'regular14'}>{t.myProfile.profilePage.publications}</Typography>
          </div>
        </div>
        <div className={s.aboutMe}>
          <Typography variant={'regular16'}>{profileData?.aboutMe}</Typography>
        </div>
      </div>
    </div>
  )
}
