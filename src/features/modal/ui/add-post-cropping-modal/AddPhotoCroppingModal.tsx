import { useEffect, useRef, useState } from 'react'

import AvatarEditor from 'react-avatar-editor'

import s from './AddPostCroppingModal.module.scss'

import { modalActions } from '@/features/modal'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import { Expand, ImageIcon, Maximize, Modal, SuperSlider, Typography } from '@/shared/ui'
import { DropDownMenu } from '@/shared/ui/drop-down-menu'

type Props = {
  addPostCroppingModal: boolean
}

export const AddPostCroppingModal = ({ addPostCroppingModal }: Props) => {
  const photo = useAppSelector(
    state => state.profileSlice.photos[state.profileSlice.photos.length - 1]
  )
  const dispatch = useAppDispatch()

  const [zoom, setZoom] = useState([1])
  const [size, setSize] = useState('1:1')
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })

  const editorRef = useRef<Nullable<AvatarEditor>>(null)

  const closeModal = () => {
    dispatch(modalActions.setCloseModal({}))
  }

  const opPrevClickHandler = () => {
    dispatch(modalActions.setOpenModal('addPostModal'))
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && photo) {
      const originalImage = new Image()

      originalImage.src = URL.createObjectURL(photo.get('file') as Blob)

      originalImage.onload = () => {
        let width, height
        const originalWidth = 492
        const originalHeight = originalImage.height

        switch (size) {
          case '1:1':
            width = Math.min(originalWidth, originalHeight)
            height = 492
            break
          case '16:9':
            width = Math.min(originalWidth, originalHeight)
            height = 492 / (16 / 9)
            break
          case '4:5':
            width = Math.min(originalWidth, originalHeight)
            height = 492 / (4 / 5)
            break
          default:
            width = originalWidth
            height = originalHeight
        }

        setDimensions({ width, height })
      }
    }
  }, [photo, size])

  const dropDownMenuZoom = [
    {
      id: 1,
      component: (
        <div style={{ width: '124px' }}>
          <SuperSlider value={zoom} setValue={setZoom} maxValue={10} minValue={1} step={0.05} />
        </div>
      ),
    },
  ]
  const dropDownMenuSize = [
    {
      id: 1,
      component: (
        <div onClick={() => setSize('Оригинал')}>
          <Typography color={'primary'}>Оригинал</Typography>
        </div>
      ),
    },
    {
      id: 2,
      component: (
        <div onClick={() => setSize('1:1')}>
          <Typography color={'primary'}>1:1</Typography>
        </div>
      ),
    },
    {
      id: 3,
      component: (
        <div onClick={() => setSize('4:5')}>
          <Typography color={'primary'}>4:5</Typography>
        </div>
      ),
    },
    {
      id: 4,
      component: (
        <div onClick={() => setSize('16:9')}>
          <Typography color={'primary'}>16:9</Typography>
        </div>
      ),
    },
  ]

  return (
    <Modal
      className={s.modalBlock}
      title={'Cropping'}
      open={addPostCroppingModal}
      prevContent={true}
      onClose={closeModal}
      showCloseButton={false}
      prevClick={opPrevClickHandler}
      nextContent={true}
      nextContentTitle={'Next'}
      contentBoxClassname={s.contentBox}
    >
      {
        <div className={s.modalContent}>
          {photo && (
            <AvatarEditor
              ref={editorRef}
              image={URL.createObjectURL(photo.get('file') as Blob)}
              width={dimensions.width}
              height={dimensions.height}
              border={0}
              color={[24, 27, 27, 0.6]}
              rotate={0}
              disableBoundaryChecks={false}
              disableHiDPIScaling={true}
              scale={zoom[0]}
            />
          )}
          <div className={s.activities}>
            <div className={s.activityLeft}>
              <div className={s.activity}>
                <DropDownMenu trigger={<Expand />} items={dropDownMenuSize} />
              </div>
              <div className={s.activity}>
                <DropDownMenu trigger={<Maximize />} items={dropDownMenuZoom} />
              </div>
            </div>
            <div className={s.activity}>
              <ImageIcon />
            </div>
          </div>
        </div>
      }
    </Modal>
  )
}
