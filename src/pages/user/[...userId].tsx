import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import imageIcon from '/public/imageIcon.svg'

import { toast } from 'react-toastify'

import s from './UserIdInfo.module.scss'

import {
  getPostsRunningQueriesThunk,
  getPublicPostById,
  GetPublicPosts,
  getPublicPostsByUserId,
  useGetPublicPostsByUserIdQuery,
  useLazyGetPublicPostByIdQuery,
} from '@/entities/posts'
import { ViewPublicPostModal } from '@/features/modal'
import { getBaseLayout } from '@/shared/providers'
import { wrapper } from '@/shared/store'
import { Nullable } from '@/shared/types'
import { Typography } from '@/shared/ui'
import { ProfileStatistic } from '@/widgets/profile-statistic'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const query = context.query

  const userId = query.userId?.[0]
  const postId = query.userId?.[1]

  store.dispatch(getPublicPostsByUserId.initiate({ userId: Number(userId) }))
  store.dispatch(getPublicPostById.initiate({ postId: Number(postId) }))
  await Promise.all(store.dispatch(getPostsRunningQueriesThunk()))

  return {
    props: {},
  }
})

export default function UserPage() {
  const { query } = useRouter()
  const userId = query.userId?.[0]
  const postId = query.userId?.[1]
  const [openModal, setOpenModal] = useState(false)
  const { data: userData } = useGetPublicPostsByUserIdQuery({ userId: Number(userId) })
  const [postData, setPostData] = useState<Nullable<GetPublicPosts>>(null)
  const [getPostData] = useLazyGetPublicPostByIdQuery()

  useEffect(() => {
    if (postId) {
      getPostData({ postId: Number(postId) })
        .unwrap()
        .then(res => {
          if (!res) {
            toast.error('Post not found!')
          }
          setPostData(res)
          setOpenModal(true)
        })
        .catch(() => {
          toast.error('Unknown Error')
        })
    }
  }, [postId])

  const onCloseHandler = () => {
    setOpenModal(false)
  }

  const mappedPosts = userData?.posts.items.slice(0, 4).map(post => {
    return (
      <div key={post.id}>
        <Image
          priority={true}
          src={post.images[0].url ?? imageIcon}
          alt={'post picture'}
          width={200}
          height={200}
          className={s.post}
        />
      </div>
    )
  })

  return (
    <div className={s.profileBlock}>
      <div className={s.mainInfo}>
        <div className={s.photoBlock}>
          <Image
            src={userData?.profile.avatars[0]?.url ?? imageIcon}
            priority={true}
            width={192}
            height={192}
            className={s.photo}
            alt={'profilePhoto'}
          />
        </div>
        <div className={s.descriptionBlock}>
          <div className={s.nameAndSettings}>
            <Typography variant={'h1'}>{userData?.profile.userName}</Typography>
          </div>
          <ProfileStatistic
            postsCount={userData?.posts.totalCount}
            aboutMe={userData?.profile.aboutMe}
          />
        </div>
      </div>
      <div className={s.postsBlock}>{mappedPosts}</div>
      {postId && postData && (
        <ViewPublicPostModal
          open={openModal}
          onClose={onCloseHandler}
          avatar={postData.profile.avatars}
          postData={postData.posts}
        />
      )}
    </div>
  )
}

UserPage.getLayout = getBaseLayout
