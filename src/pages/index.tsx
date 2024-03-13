import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { GetPublicPostsResponse } from '@/entities/posts'
import { useMeQuery } from '@/features/auth'
import { Home } from '@/pages-flat/home'
import { getAuthLayout, getBaseLayout } from '@/shared/providers'
import { HomeUnregister } from '@/widgets/home-unregistered-posts'

export const getStaticProps = (async () => {
  const postResponse = await fetch(
    `https://inctagram.work/api/v1/public-posts/all/${null}?pageSize=4`
  )
  const usersCountResponse = await fetch(`https://inctagram.work/api/v1/public-user`)

  const posts = await postResponse.json()
  const usersCount = await usersCountResponse.json()

  return {
    props: { posts, usersCount },
    revalidate: 60,
  }
}) satisfies GetStaticProps<{ posts: GetPublicPostsResponse }>

const HomePage = ({ posts, usersCount }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useMeQuery()

  return data
    ? getBaseLayout(<Home />)
    : getAuthLayout(<HomeUnregister posts={posts?.items} usersCount={usersCount.totalCount} />)
}

export default HomePage
