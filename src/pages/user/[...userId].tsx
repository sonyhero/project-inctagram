import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import imageIcon from '/public/imageIcon.svg'

import s from './UserIdInfo.module.scss'

import { AvatarOwner } from '@/entities/avatar-owner'
import {
  getPublicPostById,
  getPublicUserProfileById,
  getRunningQueriesThunk,
  getUserPublicPosts,
  useGetPublicPostByIdQuery,
  useGetPublicUserProfileByIdQuery,
  useGetUserPublicPostsQuery,
} from '@/entities/posts'
import { ViewPublicPostModal } from '@/features/modal'
import { getBaseLayout } from '@/shared/providers'
import { wrapper } from '@/shared/store'
import { Modal, Typography } from '@/shared/ui'
import { ProfileStatistic } from '@/widgets/profile-statistic'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const query = context.query

  const profileId = Number(query.userId?.[0])
  const postId = Number(query.userId?.[1])

  store.dispatch(getPublicUserProfileById.initiate({ profileId }))
  store.dispatch(getUserPublicPosts.initiate({ userId: profileId, pageSize: 4 }))
  store.dispatch(getPublicPostById.initiate({ postId }))

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

export default function UserPage() {
  const { query } = useRouter()
  const profileId = Number(query.userId?.[0])
  const postIdQuery = query.userId?.[1]
  const postId = Number(postIdQuery)
  const [openModal, setOpenModal] = useState(false)

  const { data: profileData } = useGetPublicUserProfileByIdQuery({ profileId })
  const { data: postsData } = useGetUserPublicPostsQuery({
    userId: profileId,
    pageSize: 4,
  })

  const { data: postById } = useGetPublicPostByIdQuery({ postId }, { skip: !postId })

  const mappedPosts = postsData?.items.slice(0, 4).map(post => {
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

  useEffect(() => {
    if (postId) {
      setOpenModal(true)
    }
  }, [postId])

  const onCloseHandler = () => {
    setOpenModal(false)
  }

  const currentModal = postById ? (
    <ViewPublicPostModal
      open={openModal}
      onClose={onCloseHandler}
      avatars={profileData?.avatars}
      postData={postById}
    />
  ) : (
    <Modal open={openModal} onClose={onCloseHandler}>
      Post not found!{' '}
    </Modal>
  )

  return (
    <div className={s.profileBlock}>
      <div className={s.mainInfo}>
        <div className={s.photoBlock}>
          <AvatarOwner width={192} height={192} avatarOwner={profileData?.avatars[0]?.url} />
        </div>
        <div className={s.descriptionBlock}>
          <div className={s.nameAndSettings}>
            <Typography variant={'h1'}>{profileData?.userName}</Typography>
          </div>
          <ProfileStatistic postsCount={postsData?.totalCount} aboutMe={profileData?.aboutMe} />
        </div>
      </div>
      <div className={s.postsBlock}>{mappedPosts}</div>
      {postId ? currentModal : null}
    </div>
  )
}

UserPage.getLayout = getBaseLayout
