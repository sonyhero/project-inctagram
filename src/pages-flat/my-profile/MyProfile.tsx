import s from './MyProfile.module.scss'

import { Posts } from '@/entities/posts/ui/Posts'
import { ProfileHeader } from '@/widgets/profile-header'

type Props = {
  userId: number
}

export const MyProfile = ({ userId }: Props) => {
  const scrollableID = 'scrollableID'

  return (
    <div id={scrollableID} className={s.myProfile}>
      <ProfileHeader userId={userId} />
      <Posts scrollableID={scrollableID} />
    </div>
  )
}
