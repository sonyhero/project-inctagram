import React, { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

import s from './Home.module.scss'

import {
  GetAllPublicPostsArgs,
  useGetAllPublicPostsQuery,
  useLazyGetAllPublicPostsQuery,
} from '@/entities/posts'
import { PublicPost } from '@/entities/public-posts/ui/PublicPost'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { publicPostsActions } from 'src/entities/public-posts/model'

const postDataArgs: GetAllPublicPostsArgs = {
  pageSize: 8,
  sortBy: '',
  sortDirection: 'desc',
}

export const Home = () => {
  const scrollableID = 'scrollableID'
  const { data: allUsersPostsData } = useGetAllPublicPostsQuery(postDataArgs)

  const [getNextPosts] = useLazyGetAllPublicPostsQuery()

  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight)
  const [paddingValue, setPaddingValue] = useState<number>(200)
  const allPosts = useAppSelector(state => state.publicPostsSlice.allPosts)
  const lastUploadedPostId = useAppSelector(state => state.publicPostsSlice.lastUploadedPostId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (allUsersPostsData && allUsersPostsData.items.length > 0) {
      dispatch(publicPostsActions.setPosts(allUsersPostsData.items))
    }
  }, [allUsersPostsData])

  useEffect(() => {
    const handleResize = () => {
      setInnerHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const profileContentHeight = 30
    const padding = innerHeight - profileContentHeight

    setPaddingValue(padding)
  }, [innerHeight])

  const fetchPostsData = () => {
    const lastPostId = allPosts.slice(-1)[0].id

    if (lastPostId !== lastUploadedPostId) {
      getNextPosts({ endCursorPostId: lastPostId, ...postDataArgs })
        .unwrap()
        .then(postsData => {
          dispatch(publicPostsActions.fetchScrollPosts(postsData.items))
          dispatch(publicPostsActions.setLastUploadedPostId(lastPostId))
        })
    }
  }

  const mappedPosts = allPosts.map(publicPost => <PublicPost key={publicPost.id} {...publicPost} />)

  return (
    <div id={scrollableID} className={s.home}>
      <InfiniteScroll
        dataLength={allPosts.length}
        next={fetchPostsData}
        hasMore={true}
        loader={<span>...loading</span>}
        className={s.postsBlock}
        scrollableTarget={scrollableID}
        style={{ paddingBottom: `${paddingValue}px` }}
      >
        {mappedPosts}
      </InfiniteScroll>
    </div>
  )
}
