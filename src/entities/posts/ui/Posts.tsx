import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import InfiniteScroll from 'react-infinite-scroll-component'

import s from './Posts.module.scss'

import {
  GetAllPostsArgs,
  postsActions,
  useGetPostsByUserIdQuery,
  useLazyGetPostByIdQuery,
  useLazyGetPostsByUserIdQuery,
} from '@/entities'
import { modalActions } from '@/features/modal'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import imageIcon from 'public/imageIcon.svg'

type Props = {
  scrollableID: string
}

const postDataArgs: GetAllPostsArgs = {
  pageSize: 8,
  sortBy: '',
  sortDirection: 'desc',
}

export const Posts = ({ scrollableID }: Props) => {
  const { data: postsData } = useGetPostsByUserIdQuery(postDataArgs)
  const [getPost] = useLazyGetPostByIdQuery()
  const [getNextPosts] = useLazyGetPostsByUserIdQuery()
  const publicationCount = useAppSelector(state => state.postsSlice.publicationCount)
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight)
  const [paddingValue, setPaddingValue] = useState<number>(200)

  const [lastUploadedPostId, setLastUploadedPostId] = useState<Nullable<number>>(null)
  const posts = useAppSelector(state => state.postsSlice.posts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (postsData && postsData.items.length > 0) {
      dispatch(postsActions.setPosts(postsData.items))
      dispatch(postsActions.updatePublicationCount(postsData.totalCount))
    }
  }, [postsData])

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
    const profileContentHeight = 730
    const padding = innerHeight - profileContentHeight

    setPaddingValue(padding)
  }, [innerHeight])

  const fetchPostsData = () => {
    const lastPostId = posts.slice(-1)[0].id

    if (lastPostId !== lastUploadedPostId) {
      getNextPosts({
        idLastUploadedPost: lastPostId,
        ...postDataArgs,
      })
        .unwrap()
        .then(postsData => {
          dispatch(postsActions.setPosts(postsData.items))
          setLastUploadedPostId(lastPostId)
        })
    }
  }

  const openPostModalHandler = (id: number) => {
    getPost({ postId: id })
      .unwrap()
      .then(postData => {
        dispatch(postsActions.setPost(postData))
        dispatch(modalActions.setOpenModal('viewPostModal'))
      })
  }

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchPostsData}
      hasMore={publicationCount > posts.length}
      loader={<span>...loading</span>}
      className={s.postsBlock}
      scrollableTarget={scrollableID}
      style={{ paddingBottom: `${paddingValue}px` }}
    >
      {posts.map(el => {
        return (
          <Image
            src={el.images[0].url ?? imageIcon}
            key={el.id}
            width={200}
            height={200}
            priority={true}
            alt={'postItem'}
            className={s.post}
            onClick={() => openPostModalHandler(el.id)}
          />
        )
      })}
    </InfiniteScroll>
  )
}
