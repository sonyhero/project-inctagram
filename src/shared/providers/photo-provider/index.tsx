import React, { createContext, useState, useContext } from 'react'

import { PostType, SizeType } from '@/entities/profile/model'

type PhotoContextType = {
  photos: PostType[]
  addPhoto: (photoData: PostType) => void
  deletePhoto: (photoId: string) => void
  updateZoom: (photoId: string, zoom: number[]) => void
  updateSize: (photoId: string, size: SizeType) => void
  updateWidthAndHeight: (photoId: string, width: number, height: number) => void
}

const PhotoContext = createContext<PhotoContextType>({
  photos: [],
  addPhoto: () => {},
  deletePhoto: () => {},
  updateZoom: () => {},
  updateSize: () => {},
  updateWidthAndHeight: () => {},
})

export const usePhoto = () => useContext(PhotoContext)

type Props = {
  children: React.ReactNode
}
export function PhotoProvider({ children }: Props) {
  const [photos, setPhotos] = useState<PostType[]>([])

  const addPhoto = (photoData: PostType) => {
    setPhotos([...photos, photoData])
  }

  const deletePhoto = (photoId: string) => {
    const updatedPhotos = photos.filter(photo => photo.id !== photoId)

    setPhotos(updatedPhotos)
  }

  const updateZoom = (photoId: string, zoom: number[]) => {
    setPhotos(photos.map(el => (el.id === photoId ? { ...el, zoom } : el)))
  }

  const updateSize = (photoId: string, size: SizeType) => {
    setPhotos(photos.map(el => (el.id === photoId ? { ...el, size } : el)))
  }

  const updateWidthAndHeight = (photoId: string, width: number, height: number) => {
    setPhotos(photos.map(el => (el.id === photoId ? { ...el, width, height } : el)))
  }

  return (
    <PhotoContext.Provider
      value={{ photos, addPhoto, deletePhoto, updateZoom, updateSize, updateWidthAndHeight }}
    >
      {children}
    </PhotoContext.Provider>
  )
}
