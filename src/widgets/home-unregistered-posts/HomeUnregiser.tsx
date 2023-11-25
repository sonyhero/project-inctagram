import s from './HomeUnregiser.module.scss'

import { PostUnregister } from '@/entities'
import { PostsResponseType } from '@/entities/posts'
import { Typography } from '@/shared/ui'

type Props = {
  posts?: PostsResponseType[]
  usersCount?: number
}
export const HomeUnregister = ({ posts, usersCount }: Props) => {
  const mappedPosts = posts?.map(post => {
    return (
      <PostUnregister
        key={post.id}
        postId={post.id}
        userId={post.ownerId}
        photos={post.images}
        desc={post.description}
        createdAt={post.createdAt}
        avatarOwner={post.avatarOwner}
      />
    )
  })
  const totalUserCount = String('00' + usersCount).split('')

  const renderUsersCount = (
    <ul className={s.countList}>
      {totalUserCount.map((el, index) => {
        return (
          <li key={index} className={s.countItem}>
            <Typography variant={'h2'}>{el}</Typography>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className={s.unregisterBlock}>
      <div className={s.usersCount}>
        <Typography variant={'h2'} color={'primary'}>
          Registered users:
        </Typography>
        <div className={s.count}>{renderUsersCount}</div>
      </div>
      <div className={s.posts}>{mappedPosts}</div>
    </div>
  )
}
