import { PostsImagesResponseType } from '@/entities'
import { useChangePhotoDirection } from '@/shared/hooks/useModalImagePagination'
import imageIcon from 'public/imageIcon.svg'

type Props = {
  images?: PostsImagesResponseType[]
  isFilter?: boolean
}

export const usePostImagePagination = ({ images, isFilter = true }: Props) => {
  const filterImages = isFilter ? images?.filter(img => img.width === 1440) : images

  const { nextImage, prevImage, activeIndex, setActiveIndex } = useChangePhotoDirection({
    array: filterImages,
  })

  const activeImage = (filterImages && filterImages[activeIndex].url) ?? imageIcon

  return { filterImages, activeImage, nextImage, prevImage, activeIndex, setActiveIndex }
}
