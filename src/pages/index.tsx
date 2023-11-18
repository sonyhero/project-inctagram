import Image from 'next/image'

import {
  getAllPublicPosts,
  getPostsRunningQueriesThunk,
  useGetAllPublicPostsQuery,
} from '@/entities/posts'
import { getBaseLayout } from '@/shared/providers'
import { wrapper } from '@/shared/store'

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  store.dispatch(getAllPublicPosts.initiate({ pageSize: 6 }))
  await Promise.all(store.dispatch(getPostsRunningQueriesThunk()))

  return {
    props: {},
    revalidate: 60,
  }
})

export default function HomePage() {
  const { data } = useGetAllPublicPostsQuery({ pageSize: 6 })

  console.log(data)

  const mappedPosts = data?.items.map(post => {
    return (
      <Image
        key={post.id}
        src={post.images[0].url}
        width={200}
        height={200}
        alt={'post picturer'}
      />
    )
  })

  return <div>{mappedPosts}</div>
}

HomePage.getLayout = getBaseLayout
