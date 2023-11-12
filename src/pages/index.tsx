import { GetAllPosts, useGetAllPostsQuery } from '@/entities/posts'
import { useMeQuery } from '@/features/auth'
import { useTranslation } from '@/shared/hooks'
import { getBaseLayout } from '@/shared/providers/layout/Layout'

export const getStaticProps = async () => {
  const { data } = useMeQuery()
  const { data: postsData } = await useGetAllPostsQuery({
    sortDirection: 'desc',
    pageSize: 4,
  })
  // const queriCLient = new QueryClient()

  const posts = !data ? null : postsData

  return {
    props: { posts },
    revalidate: 60,
  }
}

type Props = {
  posts: GetAllPosts
}
export default function HomePage({ posts }: Props) {
  const { t } = useTranslation()

  console.log(posts)

  return <div>{t.sidebar.home}</div>
}

HomePage.getLayout = getBaseLayout
