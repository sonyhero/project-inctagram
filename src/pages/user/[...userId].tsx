import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import imageIcon from '/public/imageIcon.svg'

import { toast } from 'react-toastify'

import s from '../../widgets/profile-info/ui/ProfileInfo.module.scss'

import {
  getPostsRunningQueriesThunk,
  getPublicPostById,
  getPublicPostsByUserId,
  useGetPublicPostByIdQuery,
  useGetPublicPostsByUserIdQuery,
} from '@/entities/posts'
import { ViewPublicPostModal } from '@/features/modal'
import { useTranslation } from '@/shared/hooks'
import { getBaseLayout } from '@/shared/providers'
import { wrapper } from '@/shared/store'
import { Typography } from '@/shared/ui'

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
  const { t } = useTranslation()
  const [openModal, setOpenModal] = useState(false)
  const [skip, setSkip] = useState(true)
  const { data: userData } = useGetPublicPostsByUserIdQuery({ userId: Number(userId) })
  const { data: postData } = useGetPublicPostByIdQuery({ postId: Number(postId ?? '') }, { skip })

  useEffect(() => {
    if (postId) {
      setSkip(false)
      setOpenModal(true)
    }
    if (!postData) {
      toast.error('Post not found!')
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
          src={post.images[0].url}
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
            src={userData?.profile.avatars[0].url ?? imageIcon}
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
          <div className={s.statistic}>
            <div>
              <Typography variant={'bold14'}>0</Typography>
              <Typography variant={'regular14'}>{t.myProfile.profilePage.following}</Typography>
            </div>
            <div>
              <Typography variant={'bold14'}>0</Typography>
              <Typography variant={'regular14'}>{t.myProfile.profilePage.followers}</Typography>
            </div>
            <div>
              <Typography variant={'bold14'}>{userData?.posts.totalCount}</Typography>
              <Typography variant={'regular14'}>{t.myProfile.profilePage.publications}</Typography>
            </div>
          </div>
          <div className={s.aboutMe}>
            <Typography variant={'regular16'}>{userData?.profile.aboutMe}</Typography>
          </div>
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
