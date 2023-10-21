import React, { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react'

import { useRouter } from 'next/router'
import AvatarEditor from 'react-avatar-editor'

import s from './profile-settings.module.scss'

import {
  useDeleteAvatarMutation,
  useGetProfileQuery,
  useUploadAvatarMutation,
} from '@/entities/profile'
import { UpdateProfileForm } from '@/features/update-profile-form'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import { Button, Close, Image, Modal, TabSwitcher, Typography } from '@/shared/ui'
import { profileSettingsSlice } from '@/widgets/profile-settings'

type PropsType = {
  userId: number
}
export const ProfileSettings: FC<PropsType> = ({ userId }) => {
  const tabSwitcherOptions = useAppSelector(state => state.profileSettingsSlice.tabSwitcherOptions)
  const currentOption = useAppSelector(state => state.profileSettingsSlice.currentOption)
  const { data: profileData } = useGetProfileQuery(userId)
  const [deletePhoto] = useDeleteAvatarMutation()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [photo, setPhoto] = useState<Nullable<FormData>>(null)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [updatePhoto] = useUploadAvatarMutation()
  const [errorPhoto, setErrorPhoto] = useState('')
  const editorRef = useRef<Nullable<AvatarEditor>>(null)
  const [zoom, setZoom] = useState(1)
  const handleTabSort = (value: string) => {
    dispatch(profileSettingsSlice.actions.setCurrentOption({ value }))
  }
  const openPhotoModal = () => {
    setOpenModal(true)
  }

  const openDeleteModalHandler = () => {
    setOpenDeleteModal(true)
  }
  const closeDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const deletePhotoHandler = () => {
    deletePhoto()
    setOpenDeleteModal(false)
  }

  const showActivePage = useMemo(() => {
    if (currentOption === t.myProfile.tabs.generalInformation) {
      return (
        <div className={s.profileSettings}>
          <div className={s.photoBlock}>
            {profileData?.avatars.length ? (
              <div className={s.photoAndDeleteBlock}>
                <img src={profileData.avatars[0].url} className={s.photo} alt="profilePhoto" />
                <div className={s.deletePhoto} onClick={openDeleteModalHandler}>
                  <Close />
                </div>
              </div>
            ) : (
              <div className={s.defaultPhoto}>
                <Image height={48} width={48} />
              </div>
            )}
            <Button variant={'outline'} onClick={openPhotoModal}>
              {t.myProfile.generalInformation.addAProfilePhoto}
            </Button>
          </div>
          {profileData ? <UpdateProfileForm defaultValue={profileData} /> : <div>Loading</div>}
        </div>
      )
    } else if (currentOption === t.myProfile.tabs.devices) {
      return <div>{t.myProfile.tabs.devices}</div>
    } else if (currentOption === t.myProfile.tabs.accountManagement) {
      return <div>{t.myProfile.tabs.accountManagement}</div>
    } else if (currentOption === t.myProfile.tabs.myPayments) {
      return <div>{t.myProfile.tabs.myPayments}</div>
    }
  }, [currentOption, profileData])

  const changeOptionTabSwitcher = useMemo(() => {
    return tabSwitcherOptions.map(el => {
      if (el.id === 1) {
        return { ...el, value: t.myProfile.tabs.generalInformation }
      }
      if (el.id === 2) {
        return { ...el, value: t.myProfile.tabs.devices }
      }
      if (el.id === 3) {
        return { ...el, value: t.myProfile.tabs.accountManagement }
      }
      if (el.id === 4) {
        return { ...el, value: t.myProfile.tabs.myPayments }
      }

      return el
    })
  }, [tabSwitcherOptions, t])

  useEffect(() => {
    dispatch(
      profileSettingsSlice.actions.setCurrentOption({
        value: t.myProfile.tabs.generalInformation,
      })
    )
  }, [locale])

  const mainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    if (file) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setErrorPhoto(t.myProfile.generalInformation.photoModal.errorType)
      } else if (file.size > 10 * 1024 * 1024) {
        setErrorPhoto(t.myProfile.generalInformation.photoModal.errorSize)
      } else {
        setErrorPhoto('')
        const formData = new FormData()

        formData.append('file', file)
        setPhoto(formData)
      }
    }
  }

  const onSaveHandler = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage()

      canvas.toBlob(blob => {
        if (blob) {
          const formData = new FormData()

          formData.append('file', blob)
          updatePhoto(formData)
          setOpenModal(false)
          setPhoto(null)
          setZoom(1)
        }
      }, 'image/jpeg')
    }
  }

  const handleZoomIn = () => {
    setZoom(zoom + 0.1)
  }

  const handleZoomOut = () => {
    if (zoom > 1) {
      setZoom(zoom - 0.1)
    }
  }

  const handleWheel = (e: any) => {
    if (e.deltaY > 0) {
      handleZoomOut()
    } else if (e.deltaY < 0) {
      handleZoomIn()
    }
  }

  const onCloseModalHandler = () => {
    setZoom(1)
    setErrorPhoto('')
    setOpenModal(false)
    setPhoto(null)
  }

  return (
    <div className={s.profileBlock}>
      <div className={s.tabSwitcher}>
        <TabSwitcher
          options={changeOptionTabSwitcher}
          onChangeCallback={value => handleTabSort(value)}
          activeTab={currentOption}
        />
      </div>
      {showActivePage}
      <Modal
        className={s.modalBlock}
        title={t.myProfile.generalInformation.photoModal.addAProfilePhoto}
        open={openModal}
        onClose={onCloseModalHandler}
      >
        {
          <div className={s.modalContent}>
            {errorPhoto && (
              <div className={s.modalError}>
                <Typography variant={'regular14'}>{errorPhoto}</Typography>
              </div>
            )}
            {photo ? (
              <div className={s.avatar} onWheel={handleWheel}>
                <AvatarEditor
                  ref={editorRef}
                  image={URL.createObjectURL(photo.get('file') as Blob)}
                  width={332}
                  height={340}
                  border={0}
                  color={[24, 27, 27, 0.6]}
                  rotate={0}
                  borderRadius={332 / 2}
                  disableBoundaryChecks={false}
                  disableHiDPIScaling={true}
                  scale={zoom}
                />
              </div>
            ) : (
              <>
                <div className={s.modalImg}>
                  <Image height={48} width={48} />
                </div>
              </>
            )}
            {photo ? (
              <div className={s.savePhoto}>
                <Button variant={'primary'} onClick={onSaveHandler}>
                  {t.myProfile.generalInformation.photoModal.save}
                </Button>
              </div>
            ) : (
              <label htmlFor={'mainPhotoInput'}>
                <Button as={'a'} variant={'primary'}>
                  {t.myProfile.generalInformation.photoModal.selectFromComputer}
                </Button>
                <div>
                  <input
                    type={'file'}
                    id="mainPhotoInput"
                    onChange={mainPhotoSelected}
                    className={s.mainPhotoInput}
                  />
                </div>
              </label>
            )}
          </div>
        }
      </Modal>
      <Modal
        className={s.modalBlock}
        title={t.myProfile.generalInformation.deletePhotoModal.deletePhoto}
        open={openDeleteModal}
        titleFirstButton={t.myProfile.generalInformation.deletePhotoModal.yes}
        titleSecondButton={t.myProfile.generalInformation.deletePhotoModal.no}
        onClose={closeDeleteModal}
        buttonBlockClassName={s.buttonBlock}
        callBack={deletePhotoHandler}
      >
        <Typography variant={'regular16'} className={s.description}>
          {t.myProfile.generalInformation.deletePhotoModal.areYouSure}
        </Typography>
      </Modal>
    </div>
  )
}
