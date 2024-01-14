import { useState } from 'react'

import { PostType } from '@/entities'
import imageIcon from 'public/imageIcon.svg'

type Props = {
  images: PostType[]
}

export const useModalImagePagination = ({ images }: Props) => {
  const { nextImage, prevImage, activeIndex, setActiveIndex } = useChangePhotoDirection({
    array: images,
  })

  const imageSrc = (images && images[activeIndex]?.imageUrl) ?? imageIcon

  const currentImage = images && images[activeIndex]

  return { imageSrc, currentImage, nextImage, prevImage, activeIndex, setActiveIndex }
}

type PropsType = {
  array?: any[]
}

export const useChangePhotoDirection = ({ array }: PropsType) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextImage = () => {
    if (array && array.length > 0 && activeIndex < array.length - 1) {
      setActiveIndex(activeIndex + 1)
    }
  }

  const prevImage = () => {
    if (array && array.length > 0 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  return {
    nextImage,
    prevImage,
    activeIndex,
    setActiveIndex,
  }
}
