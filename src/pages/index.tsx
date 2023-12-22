import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { GetPublicPostsResponse } from '@/entities/posts'
import { Home } from '@/pages-flat/home'
import { getBaseLayout } from '@/shared/providers'

export const getStaticProps = (async () => {
  const response = await fetch(`https://inctagram.work/api/v1/public-posts/all/${null}?pageSize=4`)

  const data = await response.json()

  return {
    props: { data },
    revalidate: 60,
  }
}) satisfies GetStaticProps<{ data: GetPublicPostsResponse }>

const HomePage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Home posts={data?.items} usersCount={data?.totalCount} />
}

export default HomePage
HomePage.getLayout = getBaseLayout
