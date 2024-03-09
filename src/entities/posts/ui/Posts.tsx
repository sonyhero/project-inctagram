import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'

import s from './Posts.module.scss'

import {
  GetAllPublicPostsArgs,
  postsActions,
  useGetPublicPostByIdQuery,
  useGetUserPublicPostsQuery,
  useLazyGetUserPublicPostsQuery,
} from '@/entities'
import { ViewPostModal } from '@/features/modal'
import { PATH } from '@/shared/config/routes'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import { Modal } from '@/shared/ui'
import imageIcon from 'public/imageIcon.svg'

type Props = {
  scrollableID: string
  userId: number
  postId: number
}

const postDataArgs: GetAllPublicPostsArgs = {
  pageSize: 8,
  sortBy: '',
  sortDirection: 'desc',
}

export const Posts = ({ scrollableID, userId, postId }: Props) => {
  const { push } = useRouter()
  const { data: postsData } = useGetUserPublicPostsQuery({ userId, ...postDataArgs })
  const { data: postById } = useGetPublicPostByIdQuery({ postId }, { skip: !postId })
  const [getNextPosts] = useLazyGetUserPublicPostsQuery()

  const posts = useAppSelector(state => state.postsSlice.posts)
  const dispatch = useAppDispatch()

  const [innerHeight, setInnerHeight] = useState<number>(0)
  const [paddingValue, setPaddingValue] = useState<number>(200)
  const [lastUploadedPostId, setLastUploadedPostId] = useState<Nullable<number>>(null)
  const [openModal, setOpenModal] = useState(false)

  const hasMorePosts = postsData ? postsData.items.length > posts.length : false

  useEffect(() => {
    if (postsData) {
      dispatch(postsActions.setPosts(postsData.items))
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
    const height = window.innerHeight
    const profileContentHeight = 730
    const padding = height - profileContentHeight

    setPaddingValue(padding)
  }, [innerHeight])

  const fetchPostsData = () => {
    const lastPostId = posts.slice(-1)[0].id

    if (lastPostId !== lastUploadedPostId) {
      getNextPosts({ userId, endCursorPostId: lastPostId, ...postDataArgs })
        .unwrap()
        .then(postsData => {
          dispatch(postsActions.fetchScrollPosts(postsData.items))
          setLastUploadedPostId(lastPostId)
        })
    }
  }

  useEffect(() => {
    if (postId) {
      setOpenModal(true)
    }
  }, [postId])

  const onCloseHandler = () => {
    setOpenModal(false)
  }

  const currentModal =
    postById && postById.ownerId === userId ? (
      <ViewPostModal postById={postById} open={openModal} onClose={onCloseHandler} />
    ) : (
      <Modal open={openModal} onClose={onCloseHandler}>
        Post not found!{' '}
      </Modal>
    )

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPostsData}
        hasMore={hasMorePosts}
        loader={<span>...loading</span>}
        className={s.postsBlock}
        scrollableTarget={scrollableID}
        style={{ paddingBottom: `${paddingValue}px` }}
      >
        {posts.map(el => {
          const src = el.images.filter(img => img.width === 1440)

          const openPostModalHandler = () => push(`${PATH.USER}/${userId}/${el.id}`)

          return (
            <Image
              src={src[0]?.url ?? imageIcon}
              key={el.id}
              width={200}
              height={200}
              priority={true}
              alt={'postItem'}
              className={s.post}
              onClick={openPostModalHandler}
            />
          )
        })}
      </InfiniteScroll>
      {postId ? currentModal : null}
    </>
  )
}
