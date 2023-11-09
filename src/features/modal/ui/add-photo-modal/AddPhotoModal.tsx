import { ChangeEvent, useRef, useState, WheelEvent } from 'react'

import AvatarEditor from 'react-avatar-editor'
import { toast } from 'react-toastify'

import s from './AddPhotoModal.module.scss'

import { useUploadAvatarMutation } from '@/entities/profile'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Nullable } from '@/shared/types'
import { Button, ImageIcon, Modal, Typography } from '@/shared/ui'
import { isImageFile } from '@/shared/utils/isImageFile'

type Props = {
  addPhotoModal: boolean
  setAddPhotoModal: (value: boolean) => void
}

export const AddPhotoModal = ({ addPhotoModal, setAddPhotoModal }: Props) => {
  const [updatePhoto] = useUploadAvatarMutation()
  const { t } = useTranslation()

  const [photo, setPhoto] = useState<Nullable<FormData>>(null)
  const [errorPhoto, setErrorPhoto] = useState('')
  const editorRef = useRef<Nullable<AvatarEditor>>(null)
  const [zoom, setZoom] = useState(1)

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
            .unwrap()
            .then(() => {
              toast.success(t.toast.success)
              setAddPhotoModal(false)

              setPhoto(null)
              setZoom(1)
            })
        }
      }, 'image/jpeg')
    }
  }

  const onCloseModalHandler = () => {
    setZoom(1)
    setErrorPhoto('')
    setAddPhotoModal(false)
    setPhoto(null)
  }

  //TODO реализовать зум с клавиатуры/кнопками на UI
  const handleZoomIn = () => {
    setZoom(zoom + 0.1)
  }

  const handleZoomOut = () => {
    if (zoom > 1) {
      setZoom(zoom - 0.1)
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
            <div className={s.modalImg}>
              <ImageIcon height={48} width={48} />
            </div>
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
                  id={'mainPhotoInput'}
                  onChange={mainPhotoSelected}
                  className={s.mainPhotoInput}
                />
              </div>
            </label>
          )}
        </div>
      }
    </Modal>
  )
}
