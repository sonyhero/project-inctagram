import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { GetPublicPostsResponse } from '@/entities/posts'
import { useMeQuery } from '@/features/auth'
import { Home } from '@/pages-flat/home'
import { getBaseLayout } from '@/shared/providers'
import { HomeUnregister } from '@/widgets/home-unregistered-posts'

export const getStaticProps = (async () => {
  const response = await fetch(`https://inctagram.work/api/v1/public-posts/all/${null}?pageSize=4`)

  const posts = await response.json()

  return {
    props: { posts },
    revalidate: 60,
  }
}) satisfies GetStaticProps<{ posts: GetPublicPostsResponse }>

const HomePage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = useMeQuery()

  return data ? <Home /> : <HomeUnregister posts={posts?.items} usersCount={posts?.totalCount} />
}

export default HomePage
HomePage.getLayout = getBaseLayout
