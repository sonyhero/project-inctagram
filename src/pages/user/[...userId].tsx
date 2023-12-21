import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import imageIcon from '/public/imageIcon.svg'

import s from './UserIdInfo.module.scss'

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

  const { data: postById } = useGetPublicPostByIdQuery({ postId })

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
    setOpenModal(true)
  }, [])

  const onCloseHandler = () => {
    setOpenModal(false)
  }

  return (
    <div className={s.profileBlock}>
      <div className={s.mainInfo}>
        <div className={s.photoBlock}>
          <Image
            src={profileData?.avatars[0]?.url ?? imageIcon}
            priority={true}
            width={192}
            height={192}
            className={s.photo}
            alt={'profilePhoto'}
          />
        </div>
        <div className={s.descriptionBlock}>
          <div className={s.nameAndSettings}>
            <Typography variant={'h1'}>{profileData?.userName}</Typography>
          </div>
          <ProfileStatistic postsCount={postsData?.totalCount} aboutMe={profileData?.aboutMe} />
        </div>
      </div>
      <div className={s.postsBlock}>{mappedPosts}</div>
      {postById ? (
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
      )}
    </div>
  )
}

UserPage.getLayout = getBaseLayout

// export default function UserPage() {
//   const { query } = useRouter()
//   const userId = query.userId?.[0]
//   const postId = query.userId?.[1]
//   const [openModal, setOpenModal] = useState(false)
//   const { data: userData } = useGetPublicPostsByUserIdQuery({ userId: Number(userId) })
//   const [postData, setPostData] = useState<Nullable<GetPublicPosts>>(null)
//   const [getPostData] = useLazyGetPublicPostByIdQuery()
//
//   useEffect(() => {
//     if (postId) {
//       getPostData({ postId: Number(postId) })
//         .unwrap()
//         .then(res => {
//           if (!res) {
//             toast.error('Post not found!')
//           }
//           setPostData(res)
//           setOpenModal(true)
//         })
//         .catch(() => {
//           toast.error('Unknown Error')
//         })
//     }
//   }, [postId])
//
//   const onCloseHandler = () => {
//     setOpenModal(false)
//   }
//
//   const mappedPosts = userData?.posts.items.slice(0, 4).map(post => {
//     return (
//       <div key={post.id}>
//         <Image
//           priority={true}
//           src={post.images[0].url ?? imageIcon}
//           alt={'post picture'}
//           width={200}
//           height={200}
//           className={s.post}
//         />
//       </div>
//     )
//   })
//
//   return (
//     <div className={s.profileBlock}>
//       <div className={s.mainInfo}>
//         <div className={s.photoBlock}>
//           <Image
//             src={userData?.profile.avatars[0]?.url ?? imageIcon}
//             priority={true}
//             width={192}
//             height={192}
//             className={s.photo}
//             alt={'profilePhoto'}
//           />
//         </div>
//         <div className={s.descriptionBlock}>
//           <div className={s.nameAndSettings}>
//             <Typography variant={'h1'}>{userData?.profile.userName}</Typography>
//           </div>
//           <ProfileStatistic
//             postsCount={userData?.posts.totalCount}
//             aboutMe={userData?.profile.aboutMe}
//           />
//         </div>
//       </div>
//       <div className={s.postsBlock}>{mappedPosts}</div>
//       {postId && postData && (
//         <ViewPublicPostModal
//           open={openModal}
//           onClose={onCloseHandler}
//           avatar={postData.profile.avatars}
//           postData={postData.posts}
//         />
//       )}
//     </div>
//   )
// }
//
// UserPage.getLayout = getBaseLayout
