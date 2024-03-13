import {
  getPublicPostById,
  getPublicUserProfileById,
  getRunningQueriesThunk,
  getUserPublicPosts,
} from '@/entities/posts'
import { UserProfilePage } from '@/pages-flat/user-profile-page'
import { getBaseLayout } from '@/shared/providers'
import { wrapper } from '@/shared/store'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const query = context.query

  const profileId = Number(query.userId?.[0])
  const postId = Number(query.userId?.[1])

  store.dispatch(getPublicUserProfileById.initiate({ profileId }, { forceRefetch: true }))
  store.dispatch(
    getUserPublicPosts.initiate({ userId: profileId, pageSize: 8 }, { forceRefetch: true })
  )
  store.dispatch(getPublicPostById.initiate({ postId }, { forceRefetch: true }))

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const UserPage = () => {
  return <UserProfilePage />
}

export default UserPage
UserPage.getLayout = getBaseLayout
