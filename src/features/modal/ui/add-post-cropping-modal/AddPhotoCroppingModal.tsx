import { useRef } from 'react'

import AvatarEditor from 'react-avatar-editor'

import s from './AddPostCroppingModal.module.scss'

import { modalActions } from '@/features/modal'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import { Expand, ImageIcon, Maximize, Modal } from '@/shared/ui'

type Props = {
  addPostCroppingModal: boolean
}

export const AddPostCroppingModal = ({ addPostCroppingModal }: Props) => {
  const photo = useAppSelector(state => state.profileSlice.photos[0])
  const dispatch = useAppDispatch()

  const editorRef = useRef<Nullable<AvatarEditor>>(null)

  const closeModal = () => {
    dispatch(modalActions.setCloseModal({}))
  }

  const opPrevClickHandler = () => {
    dispatch(modalActions.setOpenModal('addPostModal'))
  }

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
              width={492}
              height={504}
              border={0}
              color={[24, 27, 27, 0.6]}
              rotate={0}
              disableBoundaryChecks={false}
              disableHiDPIScaling={true}
            />
          )}
          <div className={s.activities}>
            <div className={s.activityLeft}>
              <div className={s.activity}>
                <Expand />
              </div>
              <div className={s.activity}>
                <Maximize />
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
