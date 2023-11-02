import React, { useState } from 'react'

import ImageNext from 'next/image'

import loaderIcon from '../../../../../public/loader.svg'

import s from './VewPostModal.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { modalActions } from '@/features/modal'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import {
  ArrowIosBack,
  ArrowIosForward,
  Bookmark,
  Button,
  Edit,
  Heart,
  Modal,
  MoreHorizontal,
  PaperPlane,
  Size1to1,
  SizeOriginal,
  TextField,
  Trash,
  Typography,
} from '@/shared/ui'
import { DropDownMenu } from '@/shared/ui/drop-down-menu'

type Props = {
  open: boolean
  userId: number
}

export const ViewPostModal = ({ open, userId }: Props) => {
  const post = useAppSelector(state => state.profileSlice.post)
  const { data } = useGetProfileQuery(userId)
  const [activeIndex, setActiveIndex] = useState(0)
  const activePhoto = post?.images[activeIndex]

  const dispatch = useAppDispatch()
  const closeModal = () => {
    dispatch(modalActions.setCloseModal({}))
  }
  const changePhoto = (direction: 'next' | 'prev') => {
    if (post?.images && post?.images.length > 2) {
      if (direction === 'next' && activeIndex < post?.images.length - 2) {
        setActiveIndex(activeIndex + 2)
      } else if (direction === 'prev' && activeIndex > 1) {
        setActiveIndex(activeIndex - 2)
      }
    }
  }
  const profileAvatarLoader = () =>
    data?.avatars.length && {
      loader: () => data.avatars[0].url,
      className: s.photo,
    }

  const dropDownMenuSize = [
    {
      id: 1,
      component: (
        <div onClick={() => {}} className={s.itemActivity}>
          <Edit />
          <Typography variant={'regular14'} color={'primary'}>
            Edit Post
          </Typography>
        </div>
      ),
    },
    {
      id: 2,
      component: (
        <div
          onClick={() => {
            dispatch(modalActions.setOpenExtraModal('deletePostModal'))
          }}
          className={s.itemActivity}
        >
          <Trash />
          <Typography variant={'regular14'} color={'primary'}>
            Delete Post
          </Typography>
        </div>
      ),
    },
  ]

  return (
    <Modal
      className={s.modalBlock}
      showHeader={false}
      title={'Post'}
      open={open}
      onClose={closeModal}
      showCloseButton={false}
      contentBoxClassname={s.contentBox}
    >
      {post?.images && post?.images.length > 0 && activePhoto && (
        <div className={s.modalContent}>
          <div className={s.lastPhoto}>
            {activeIndex > 0 && (
              <div className={s.back} onClick={() => changePhoto('prev')}>
                <ArrowIosBack />
              </div>
            )}
            <img src={activePhoto.url} alt={'post'} className={s.photo} />
            {activeIndex < post?.images.length - 2 && (
              <div className={s.forvard} onClick={() => changePhoto('next')}>
                <ArrowIosForward />
              </div>
            )}
          </div>
          <div className={s.postDescriptionBlock}>
            <div className={s.topContent}>
              <div className={s.photoBlock}>
                <ImageNext
                  src={loaderIcon}
                  priority={true}
                  {...profileAvatarLoader()}
                  alt={'profilePhoto'}
                />
                <Typography>{data?.userName}</Typography>
              </div>
              <DropDownMenu
                trigger={<MoreHorizontal />}
                side={'bottom'}
                items={dropDownMenuSize}
                align={'end'}
              />
            </div>
            <div className={s.middleContent}>
              <div className={s.comments}></div>
              <div className={s.bottomActivityBlock}>
                <div className={s.likeSaveSetBlock}>
                  <div className={s.likeAndSet}>
                    <Heart />
                    <PaperPlane />
                  </div>
                  <Bookmark />
                </div>
                <div className={s.viewsAndCount}>
                  <div className={s.views}>
                    {[0, 1, 2].map(el => {
                      return <div key={el} className={s.view}></div>
                    })}
                  </div>
                  <div className={s.count}>
                    <Typography variant={'regular14'} color={'primary'}>
                      2243
                    </Typography>
                    <Typography variant={'bold14'} color={'primary'}>
                      &quot;Like&quot;
                    </Typography>
                  </div>
                </div>
                <Typography variant={'small'} color={'secondary'}>
                  July 3, 2021
                </Typography>
              </div>
            </div>
            <div className={s.bottomContent}>
              <TextField
                style={{ border: 'none' }}
                type={'default'}
                className={s.addComment}
                placeholder={'Add a Comment...'}
              />
              <Button variant={'text'}>Publish</Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
