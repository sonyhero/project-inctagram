import { PostsResponseType } from '@/entities/posts'
import { useMeQuery } from '@/features/auth'
import { HomeUnregister } from '@/widgets/home-unregistered-posts'

type PropsType = {
  posts?: PostsResponseType[]
  usersCount?: number
}
export const Home = ({ posts, usersCount }: PropsType) => {
  const { data } = useMeQuery()

  return data ? (
    <div>Posts in register account</div>
  ) : (
    <HomeUnregister posts={posts} usersCount={usersCount} />
  )
}
