import { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import imageIcon from '/public/imageIcon.svg'

import {
  getPostsRunningQueriesThunk,
  getPublicPostById,
  getPublicPostsByUserId,
  useGetPublicPostByIdQuery,
  useGetPublicPostsByUserIdQuery,
} from '@/entities/posts'
import { getBaseLayout } from '@/shared/providers'
import { wrapper } from '@/shared/store'
import { Modal } from '@/shared/ui'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const query = context.query

  const { userId } = query

  store.dispatch(getPublicPostsByUserId.initiate({ userId: Number(userId?.[0]) }))
  store.dispatch(getPublicPostById.initiate({ postId: Number(userId?.[1]) }))
  await Promise.all(store.dispatch(getPostsRunningQueriesThunk()))

  return {
    props: {},
  }
})

export default function UserPage() {
  const { query, push } = useRouter()
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setOpenModal(true)
  }, [])

  const onCloseHandler = () => {
    setOpenModal(false)
    // push(`/`)
  }

  const { data: userData } = useGetPublicPostsByUserIdQuery({ userId: Number(query.userId?.[0]) })

  const { data: postData } = useGetPublicPostByIdQuery({ postId: Number(query.userId?.[1]) })

  const mappedPosts = userData?.posts.items.map(post => {
    return (
      <div key={post.id}>
        <Image
          priority={true}
          src={post.images[0].url}
          alt={'post picture'}
          width={200}
          height={200}
        />
      </div>
    )
  })

  console.log('userData:', userData)
  console.log('postData:', postData)

  return (
    <div>
      Hello, it is user!
      <div>
        <Image
          priority={true}
          src={userData?.profile.avatars[0].url ?? imageIcon}
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
      <div>Publications: {userData?.posts.totalCount}</div>
      <div>About ME: {userData?.profile.aboutMe}</div>
      {mappedPosts}
      <Modal open={openModal} onClose={onCloseHandler}>
        {postData ? (
          <>
            <Image
              priority={true}
              src={postData.posts.images[0].url}
              alt={'post picture'}
              width={200}
              height={200}
            />
            Description: {postData.posts.description}
          </>
        ) : (
          'Post not found!'
        )}
      </Modal>
    </div>
  )
}

UserPage.getLayout = getBaseLayout
