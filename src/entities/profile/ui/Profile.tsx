import React from 'react'

import Image from 'next/image'

import imageIcon from '../../../../public/imageIcon.svg'
import loader from '../../../../public/loader.svg'

import s from './Profile.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { useGetPostsByUserIdQuery, useLazyGetPostByIdQuery } from '@/entities/profile/api/postsApi'
import { profileActions } from '@/entities/profile/model'
import { modalActions } from '@/features/modal'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch } from '@/shared/store'
import { Button, Typography } from '@/shared/ui'
import { profileSettingsSlice } from '@/widgets/profile-settings'

type Props = {
  userId: number
}
export const Profile = ({ userId }: Props) => {
  const { t } = useTranslation()
  const { data, isLoading, isFetching } = useGetProfileQuery(userId)
  const { data: postsData } = useGetPostsByUserIdQuery({
    idLastUploadedPost: userId,
    pageSize: 8,
    sortBy: '',
    sortDirection: 'desc',
  })
  const [getPost] = useLazyGetPostByIdQuery()

  const dispatch = useAppDispatch()

  // console.log(postsData)
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

  const isLoadingAvatar = isLoading && isFetching

  return (
    <div className={s.profileBlock}>
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
        {postsData?.items.map(el => {
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
