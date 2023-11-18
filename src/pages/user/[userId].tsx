import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'

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
  const { profile, posts }: GetUsersAllPosts = user

  console.log(user)

  return (
    <div>
      Hello, it is user!
      <div>
        <Image
          priority={true}
          src={profile.avatars[0].url}
          alt={'user avatar'}
          width={400}
          height={400}
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
          }}
        />
      </div>
      <div>Publications: {posts.totalCount}</div>
      <div>About ME: {profile.aboutMe}</div>
    </div>
  )
}

UserPage.getLayout = getAuthLayout
