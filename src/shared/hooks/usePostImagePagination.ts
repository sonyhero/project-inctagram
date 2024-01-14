import { useState } from 'react'

import { PostsImagesResponseType } from '@/entities'
import imageIcon from 'public/imageIcon.svg'

type Props = {
  images?: PostsImagesResponseType[]
  isFilter?: boolean
}

export const usePostImagePagination = ({ images, isFilter = true }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const filterImages = isFilter ? images?.filter(img => img.width === 1440) : images

  const nextImage = () => {
    if (filterImages && filterImages.length > 0 && activeIndex < filterImages.length - 1) {
      setActiveIndex(activeIndex + 1)
    }
  }

  const prevImage = () => {
    if (filterImages && filterImages.length > 0 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  const activeImage = (filterImages && filterImages[activeIndex].url) ?? imageIcon

  return { filterImages, activeImage, nextImage, prevImage, activeIndex, setActiveIndex }
}

// const changePhoto = (direction: 'next' | 'prev') => {
//   if (filterImages && filterImages.length > 0) {
//     if (direction === 'next' && activeIndex < filterImages.length - 1) {
//       setActiveIndex(activeIndex + 1)
//     } else if (direction === 'prev' && activeIndex > 0) {
//       setActiveIndex(activeIndex - 1)
//     }
//   }
// }
