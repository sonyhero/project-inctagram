import {
  getAllPublicPosts,
  getPostsRunningQueriesThunk,
  useGetAllPublicPostsQuery,
} from '@/entities/posts'
import { Home } from '@/pages-flat/home'
import { getBaseLayout } from '@/shared/providers'
import { wrapper } from '@/shared/store'

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  store.dispatch(getAllPublicPosts.initiate({ pageSize: 4 }))
  await Promise.all(store.dispatch(getPostsRunningQueriesThunk()))

  return {
    props: {},
    revalidate: 60,
  }
})

export default function HomePage() {
  const { data } = useGetAllPublicPostsQuery({ pageSize: 4 })

  return <Home posts={data?.items} />
}

HomePage.getLayout = getBaseLayout
