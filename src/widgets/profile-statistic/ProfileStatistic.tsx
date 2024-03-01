import React from 'react'

import s from './ProfileStatistic.module.scss'

import { useGetUserQuery, useLazyGetUserFollowersQuery } from '@/features/following/api'
import { useTranslation } from '@/shared/hooks'
import { Typography } from '@/shared/ui'

type Props = {
  userName?: string
  postsCount?: number
  aboutMe?: string
}

export const ProfileStatistic = (props: Props) => {
  const { postsCount, aboutMe, userName } = props
  const { data: userData } = useGetUserQuery({ userName }, { skip: !userName })
  const [getFollowers] = useLazyGetUserFollowersQuery()
  const { t } = useTranslation()

  const getFollowersHandler = () => {
    userName && getFollowers({ userName, cursor: 0 })
  }

  return (
    <>
      <div className={s.statistic}>
        <div>
          <Typography variant={'bold14'}>{userData?.followingCount}</Typography>
          <Typography variant={'regular14'}>{t.myProfile.profilePage.following}</Typography>
        </div>
        <div onClick={getFollowersHandler}>
          <Typography variant={'bold14'}>{userData?.followersCount}</Typography>
          <Typography variant={'regular14'}>{t.myProfile.profilePage.followers}</Typography>
        </div>
        <div>
          <Typography variant={'bold14'}>{postsCount}</Typography>
          <Typography variant={'regular14'}>{t.myProfile.profilePage.publications}</Typography>
        </div>
      </div>
      <div className={s.aboutMe}>
        <Typography variant={'regular16'}>{aboutMe}</Typography>
      </div>
    </>
  )
}
