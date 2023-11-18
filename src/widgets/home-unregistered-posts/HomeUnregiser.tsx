import s from './HomeUnregiser.module.scss'

import { PostUnregister } from '@/entities'
import { PostsResponseType } from '@/entities/posts'
import { Typography } from '@/shared/ui'

type Props = {
  posts?: PostsResponseType[]
}
export const HomeUnregister = ({ posts }: Props) => {
  const mappedPosts = posts?.map(post => {
    return (
      <PostUnregister
        key={post.id}
        photos={post.images}
        desc={post.description}
        createdAt={post.createdAt}
      />
    )
  })

  return (
    <div className={s.unregisterBlock}>
      <div className={s.usersCount}>
        <Typography variant={'h2'} color={'primary'}>
          Registered users:
        </Typography>
        <div className={s.count}></div>
      </div>
      <div className={s.posts}>{mappedPosts}</div>
    </div>
  )
}
