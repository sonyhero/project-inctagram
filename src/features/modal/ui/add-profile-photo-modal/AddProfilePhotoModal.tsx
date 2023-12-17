import { ChangeEvent, useRef, useState, WheelEvent } from 'react'

import AvatarEditor from 'react-avatar-editor'
import { toast } from 'react-toastify'

import s from './AddProfilePhotoModal.module.scss'

import { useUploadAvatarMutation } from '@/entities/profile'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Nullable } from '@/shared/types'
import { Button, ErrorValidPhoto, Modal, PhotoPlaceholder, SuperSlider } from '@/shared/ui'
import { isImageFile } from '@/shared/utils'

type Props = {
  addPhotoModal: boolean
  setAddPhotoModal: (value: boolean) => void
}

export const AddProfilePhotoModal = ({ addPhotoModal, setAddPhotoModal }: Props) => {
  const [updatePhoto] = useUploadAvatarMutation()
  const { t } = useTranslation()

  const [photo, setPhoto] = useState<File | string>('')
  const [errorPhoto, setErrorPhoto] = useState('')
  const editorRef = useRef<Nullable<AvatarEditor>>(null)
  const [zoom, setZoom] = useState<number[]>([1])

  const maxZoomValue = 2
  const minZoomValue = 0.1
  const zoomStep = 0.1

  const mainPhotoSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    if (file) {
      const isImage = await isImageFile(file)

      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setErrorPhoto(t.myProfile.generalInformation.photoModal.errorType)
      } else if (!isImage) {
        setErrorPhoto(t.myProfile.generalInformation.photoModal.errorBrokenFile)
      } else if (file.size > 10 * 1024 * 1024) {
        setErrorPhoto(t.myProfile.generalInformation.photoModal.errorSize)
      } else if (file.size === 0) {
        setErrorPhoto(t.myProfile.generalInformation.photoModal.errorZeroSize)
      } else {
        setErrorPhoto('')
        setPhoto(file)
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
            .unwrap()
            .then(() => {
              toast.success(t.toast.success)
              setAddPhotoModal(false)

              setPhoto('')
              setZoom([1])
            })
        }
      }, 'image/jpeg')
    }
  }

  const onCloseModalHandler = () => {
    setZoom([1])
    setErrorPhoto('')
    setAddPhotoModal(false)
    setPhoto('')
  }

  const handleZoomIn = () => {
    if (zoom[0] < maxZoomValue) {
      setZoom([zoom[0] + zoomStep])
    }
  }

  const handleZoomOut = () => {
    if (zoom[0] > minZoomValue) {
      setZoom([zoom[0] - zoomStep])
    }
  }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) {
      handleZoomOut()
    } else if (event.deltaY < 0) {
      handleZoomIn()
    }
  }

  return (
    <Modal
      className={s.modalBlock}
      title={t.myProfile.generalInformation.photoModal.addAProfilePhoto}
      open={addPhotoModal}
      onClose={onCloseModalHandler}
    >
      {
        <div className={s.modalContent}>
          {errorPhoto && <ErrorValidPhoto error={errorPhoto} />}
          {photo ? (
            <div className={s.avatar} onWheel={handleWheel}>
              <AvatarEditor
                ref={editorRef}
                image={photo}
                width={332}
                height={340}
                border={0}
                color={[24, 27, 27, 0.6]}
                rotate={0}
                borderRadius={332 / 2}
                disableBoundaryChecks={false}
                disableHiDPIScaling={true}
                scale={zoom[0]}
              />
              <SuperSlider
                value={zoom}
                setValue={setZoom}
                maxValue={maxZoomValue}
                minValue={minZoomValue}
                step={zoomStep}
              />
            </div>
          ) : (
            <PhotoPlaceholder />
          )}

          <div className={s.savePhoto}>
            <label htmlFor={'mainPhotoInput'}>
              <Button as={'a'} variant={'primary'}>
                {photo
                  ? t.myProfile.generalInformation.photoModal.selectOther
                  : t.myProfile.generalInformation.photoModal.selectFromComputer}
              </Button>
              <input
                type={'file'}
                id={'mainPhotoInput'}
                onChange={mainPhotoSelected}
                className={s.mainPhotoInput}
              />
            </label>
            {photo && (
              <Button variant={'primary'} onClick={onSaveHandler}>
                {t.myProfile.generalInformation.photoModal.save}
              </Button>
            )}
          </div>
        </div>
      }
    </Modal>
  )
}
