export const getReducedImageParams = (props: ImageParamsType) => {
  const { originalHeight, originalWidth, maxSize = 472 } = props

  const reductionFactor =
    Math.max(originalWidth, originalHeight) / Math.min(originalWidth, originalHeight)
  const reducedWidth = originalWidth > originalHeight ? maxSize : maxSize / reductionFactor
  const reducedHeight = originalHeight > originalWidth ? maxSize : maxSize / reductionFactor

  return { reducedWidth, reducedHeight, originalHeight, originalWidth, maxSize }
}

type ImageParamsType = {
  originalHeight: number
  originalWidth: number
  maxSize?: number
}
