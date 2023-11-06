import React, { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import imageIcon from '../../../../public/imageIcon.svg'
import loader from '../../../../public/loader.svg'

import s from './Profile.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import {
  useGetPostsByUserIdQuery,
  useLazyGetPostByIdQuery,
  useLazyGetPostsByUserIdQuery,
} from '@/entities/profile/api/postsApi'
import { GetAllPostsItems } from '@/entities/profile/api/postsApi.types'
import { profileActions } from '@/entities/profile/model'
import { modalActions } from '@/features/modal'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Button, Typography } from '@/shared/ui'
import { profileSettingsSlice } from '@/widgets/profile-settings'

type Props = {
  userId: number
}
export const Profile = ({ userId }: Props) => {
  const { t } = useTranslation()
  const { data, isLoading, isFetching } = useGetProfileQuery(userId)

  const dispatch = useAppDispatch()
  const posts = useAppSelector(state => state.profileSlice.posts)

  const { data: postsData, isFetching: fetchPost } = useGetPostsByUserIdQuery({
    pageSize: 12,
    sortBy: '',
    sortDirection: 'desc',
  })

  const [getNextPosts] = useLazyGetPostsByUserIdQuery()

  useEffect(() => {
    if (postsData) {
      if (postsData.items.length > 1) {
        dispatch(profileActions.setPosts(postsData.items))
      }
    }
  }, [postsData])

  const [getPost] = useLazyGetPostByIdQuery()

  const showProfileSettingsHandler = () => {
    dispatch(profileSettingsSlice.actions.setShowProfileSettings({ value: true }))
  }

  const profileAvatarLoader = () =>
    data?.avatars.length && {
      loader: () => data.avatars[0].url,
      className: s.photo,
    }

  const openPostModalHandler = (id: number) => {
    getPost({ postId: id })
      .unwrap()
      .then(async postData => {
        await dispatch(profileActions.setPost(postData))
        dispatch(modalActions.setOpenModal('viewPostModal'))
      })
  }
  const postsBlockRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = postsBlockRef.current

    if (element) {
      const handleScroll = () => {
        const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight

        if (atBottom) {
          getNextPosts({
            idLastUploadedPost: posts.slice(-1)[0].id,
            pageSize: 8,
            sortBy: '',
            sortDirection: 'desc',
          })
            .unwrap()
            .then(postsData => {
              dispatch(profileActions.setPosts(postsData.items))
            })
        }
      }

      element.addEventListener('scroll', handleScroll)

      return () => {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [posts])

  const isLoadingAvatar = isLoading && isFetching

  return (
    <div className={s.profileBlock} ref={postsBlockRef}>
      <div className={s.mainInfo}>
        <div className={s.photoBlock}>
          {isLoadingAvatar ? (
            <Image src={loader} priority={true} alt={'profilePhoto'} />
          ) : (
            <Image
              src={imageIcon}
              priority={true}
              {...profileAvatarLoader()}
              alt={'profilePhoto'}
            />
          )}
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
              <Typography variant={'bold14'}>0</Typography>
              <Typography variant={'regular14'}>{t.myProfile.profilePage.publications}</Typography>
            </div>
          </div>
          <div className={s.aboutMe}>
            <Typography variant={'regular16'}>{data?.aboutMe}</Typography>
          </div>
        </div>
      </div>
      <div className={s.postsBlock}>
        {posts.map(el => {
          return (
            <img
              src={el.images[0].url}
              key={el.id}
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
