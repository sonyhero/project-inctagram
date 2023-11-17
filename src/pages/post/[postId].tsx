import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'

import { GetPublicPosts } from '@/entities/posts'
import { getAuthLayout } from '@/shared/providers'

export const getServerSideProps = (async context => {
  const postId = Number(context.params?.postId)

  const res = await fetch(`https://inctagram.work/api/v1/public-posts/p/${postId}`)
  const post = await res.json()

  return {
    props: { post },
  }
}) satisfies GetServerSideProps<{
  post: GetPublicPosts
}>

export default function UserPost({ post }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { posts }: GetPublicPosts = post

  console.log(posts)

  return (
    <div>
      <Image
        priority={true}
        src={posts.images[0].url}
        alt={'post picture'}
        width={200}
        height={200}
      />
    </div>
  )
}

UserPost.getLayout = getAuthLayout
