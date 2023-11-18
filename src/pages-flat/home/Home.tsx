import { GetAllPosts, useGetAllPostsQuery } from '@/entities/posts'
import { useMeQuery } from '@/features/auth'
import { useTranslation } from '@/shared/hooks/useTranstaion'

export const getStaticProps = async () => {
  const { data } = useMeQuery()
  const { data: postsData } = await useGetAllPostsQuery({
    sortDirection: 'desc',
    pageSize: 4,
  })

  const posts = !data ? null : postsData

  return {
    props: { posts },
    revalidate: 60,
  }
}

type PropsType = {
  posts: GetAllPosts
}
export const Home = ({ posts }: PropsType) => {
  const { t } = useTranslation()

  // console.log(posts)

  return <div>{t.sidebar.home}</div>
}
