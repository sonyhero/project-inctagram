import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import InfiniteScroll from 'react-infinite-scroll-component'

import { allPostsActions } from '@/entities/all-posts/model'
import {
  GetAllPublicPostsArgs,
  useGetAllPublicPostsQuery,
  useLazyGetAllPublicPostsQuery,
} from '@/entities/posts'
import s from '@/entities/posts/ui/Posts.module.scss'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import imageIcon from 'public/imageIcon.svg'

const postDataArgs: GetAllPublicPostsArgs = {
  pageSize: 8,
  sortBy: '',
  sortDirection: 'desc',
}

export const Home = () => {
  const { data: allUsersPostsData } = useGetAllPublicPostsQuery(postDataArgs)

  const [getNextPosts] = useLazyGetAllPublicPostsQuery()

  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight)
  const [paddingValue, setPaddingValue] = useState<number>(200)
  const allPosts = useAppSelector(state => state.allPostsSlice.allPosts)
  const lastUploadedPostId = useAppSelector(state => state.allPostsSlice.lastUploadedPostId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (allUsersPostsData && allUsersPostsData.items.length > 0) {
      dispatch(allPostsActions.setPosts(allUsersPostsData.items))
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
          dispatch(allPostsActions.fetchScrollPosts(postsData.items))
          dispatch(allPostsActions.setLastUploadedPostId(lastPostId))
        })
    }
  }

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchPostsData}
      hasMore={true}
      loader={<span>...loading</span>}
      className={s.postsBlock}
      scrollableTarget={'scrollableID'}
      style={{ paddingBottom: `${paddingValue}px` }}
    >
      {allPosts.map(el => (
        <Image
          src={el.images[0]?.url ?? imageIcon}
          key={el.id}
          width={200}
          height={200}
          priority={true}
          alt={'postItem'}
          className={s.post}
          // onClick={() => openPostModalHandler(el.id)}
        />
      ))}
    </InfiniteScroll>
  )
}
