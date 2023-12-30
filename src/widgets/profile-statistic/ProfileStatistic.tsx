import React from 'react'

import s from './ProfileStatistic.module.scss'

import { useTranslation } from '@/shared/hooks'
import { Typography } from '@/shared/ui'

type Props = {
  following?: number
  followers?: number
  postsCount?: number
  aboutMe?: string
}

export const ProfileStatistic = (props: Props) => {
  const { following, followers, postsCount, aboutMe } = props
  const { t } = useTranslation()

  return (
    <>
      <div className={s.statistic}>
        <div>
          <Typography variant={'bold14'}>{following}</Typography>
          <Typography variant={'regular14'}>{t.myProfile.profilePage.following}</Typography>
        </div>
        <div>
          <Typography variant={'bold14'}>{followers}</Typography>
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
