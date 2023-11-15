import React, { useEffect, useRef, useState } from 'react'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import Image from 'next/image'

import s from './ProfileInfo.module.scss'

import {
  postsActions,
  useGetPostsByUserIdQuery,
  useLazyGetPostByIdQuery,
  useLazyGetPostsByUserIdQuery,
} from '@/entities/posts'
import { useGetProfileQuery } from '@/entities/profile'
import { modalActions } from '@/features/modal'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import { Button, Typography } from '@/shared/ui'
import { profileSettingsSlice } from '@/widgets/profile-settings'
import imageIcon from 'public/imageIcon.svg'
import loader from 'public/loader.svg'

type Props = {
  userId: number
}
export const ProfileInfo = ({ userId }: Props) => {
  const { t } = useTranslation()

  const posts = useAppSelector(state => state.postsSlice.posts)
  const publicationCount = useAppSelector(state => state.postsSlice.publicationCount)
  const dispatch = useAppDispatch()

  const { data, isLoading, isFetching } = useGetProfileQuery(userId)
  const { data: postsData } = useGetPostsByUserIdQuery({
    pageSize: 8,
    sortBy: '',
    sortDirection: 'desc',
  })
  const [getNextPosts] = useLazyGetPostsByUserIdQuery()
  const [getPost] = useLazyGetPostByIdQuery()

  const isLoadingAvatar = isLoading && isFetching
  const avatar = data?.avatars.length && data.avatars[0].url
  const profilePhoto = isLoadingAvatar ? loader : avatar ?? imageIcon

  const [getLastUploadedPostId, setLastUploadedPostId] = useState<Nullable<number>>(null)
  const [postsRef] = useAutoAnimate<HTMLDivElement>()

  useEffect(() => {
    if (posts.length === 0) {
      if (postsData && postsData.items.length > 0) {
        dispatch(postsActions.updatePublicationCount(postsData.totalCount))
        dispatch(postsActions.setPosts(postsData.items))
      }
    }
  }, [postsData])

  const showProfileSettingsHandler = () => {
    dispatch(profileSettingsSlice.actions.setShowProfileSettings({ value: true }))
  }

  const openPostModalHandler = (id: number) => {
    getPost({ postId: id })
      .unwrap()
      .then(async postData => {
        await dispatch(postsActions.setPost(postData))
        dispatch(modalActions.setOpenModal('viewPostModal'))
      })
  }

  //infinity scroll
  const postsBlockRef = useRef<Nullable<HTMLDivElement>>(null)

  useEffect(() => {
    const element = postsBlockRef.current

    if (element) {
      const handleScroll = () => {
        const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight

        if (atBottom) {
          const lastPostId = posts.slice(-1)[0].id

          if (lastPostId !== getLastUploadedPostId) {
            getNextPosts({
              idLastUploadedPost: lastPostId,
              pageSize: 8,
              sortBy: '',
              sortDirection: 'desc',
            })
              .unwrap()
              .then(postsData => {
                dispatch(postsActions.setPosts(postsData.items))
                setLastUploadedPostId(lastPostId)
              })
          }
        }
      }

      element.addEventListener('scroll', handleScroll)

      return () => {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [posts, getNextPosts, getLastUploadedPostId])

  const windowHeight = window.innerHeight
  const paddingValue = windowHeight * 0.67

  return (
    <div className={s.profileBlock} ref={postsBlockRef}>
      <div className={s.mainInfo}>
        <div className={s.photoBlock}>
          <Image
            src={profilePhoto}
            priority={true}
            width={192}
            height={192}
            className={s.photo}
            alt={'profilePhoto'}
          />
        </div>
        <div className={s.descriptionBlock}>
          <div className={s.nameAndSettings}>
            <Typography variant={'h1'}>{data?.userName}</Typography>
            <Button variant={'secondary'} onClick={showProfileSettingsHandler}>
              {t.myProfile.profilePage.profileSettings}
            </Button>
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
              <Typography variant={'bold14'}>{publicationCount}</Typography>
              <Typography variant={'regular14'}>{t.myProfile.profilePage.publications}</Typography>
            </div>
          </div>
          <div className={s.aboutMe}>
            <Typography variant={'regular16'}>{data?.aboutMe}</Typography>
          </div>
        </div>
      </div>
      <div className={s.postsBlock} style={{ paddingBottom: `${paddingValue}px` }} ref={postsRef}>
        {posts.map(el => {
          return (
            <Image
              src={el.images[0].url}
              key={el.id}
              width={1000}
              height={1000}
              priority={true}
              alt={'postItem'}
              className={s.post}
              onClick={() => openPostModalHandler(el.id)}
            />
          )
        })}
      </div>
    </div>
  )
}
