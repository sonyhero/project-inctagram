import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { GetUsersAllPosts } from '@/entities/posts'
import { getAuthLayout } from '@/shared/providers'

export const getServerSideProps = (async context => {
  const userId = Number(context.params?.userId)

  const res = await fetch(`https://inctagram.work/api/v1/public-posts/user/${userId}`)
  const user = await res.json()

  return {
    props: { user },
  }
}) satisfies GetServerSideProps<{
  user: GetUsersAllPosts
}>

export default function UserPage({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { profile }: GetUsersAllPosts = user

  console.log(user)

  return <div>Hello, it is user!</div>
}

UserPage.getLayout = getAuthLayout
