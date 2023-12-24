import { v1 } from 'uuid'

import { postsActions } from '@/entities'
import { modalActions } from '@/features/modal'
import { addDataToDB, PostDataBaseType } from '@/shared/config/draftDataBase'
import { AppDispatch } from '@/shared/store'
import { getReducedImageParams } from '@/shared/utils/getReducedOriginalImgSize'

type Props = {
  file: Blob
  dispatch: AppDispatch
  activeIndex?: number
  isModalPayload?: boolean
}

export const getNewPhoto = (props: Props) => {
  const { file, dispatch, isModalPayload = false, activeIndex } = props
  const photoId = v1()

  const image = new Image()

  image.src = URL.createObjectURL(file)

  image.onload = () => {
    const { reducedHeight, reducedWidth } = getReducedImageParams({
      originalWidth: image.width,
      originalHeight: image.height,
    })

    const newPhoto: PostDataBaseType = {
      id: photoId,
      name: file.name,
      type: file.type,
      size: file.size,
      zoom: [1],
      sizeScale: 'Оригинал',
      width: reducedWidth,
      height: reducedHeight,
      image: file,
      filter: 'none',
    }

    addDataToDB(newPhoto)

    // dispatch(postsActions.setPhotoOfPost(newPhoto))
    isModalPayload && dispatch(modalActions.setOpenModal('addPostCroppingModal'))
    activeIndex && dispatch(postsActions.setActiveIndex(activeIndex + 1))
  }
}
