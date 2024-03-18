export const isImageFile = async (file: File) => {
  const buffer = await file.arrayBuffer()
  const uint8Array = new Uint8Array(buffer.slice(0, 4))

  // Проверка сигнатуры файла для JPEG
  if (uint8Array[0] === 0xff && uint8Array[1] === 0xd8 && uint8Array[2] === 0xff) {
    return true
  }

  // Проверка сигнатуры файла для PNG
  if (
    uint8Array[0] === 0x89 &&
    uint8Array[1] === 0x50 &&
    uint8Array[2] === 0x4e &&
    uint8Array[3] === 0x47
  ) {
    return true
  }

  // Проверка сигнатуры файла для JPEG (альтернативная сигнатура)
  if (
    uint8Array[0] === 0xff &&
    uint8Array[1] === 0xd8 &&
    uint8Array[2] === 0xff &&
    uint8Array[3] === 0xe0
  ) {
    return true
  }

  // Проверка сигнатуры файла для JPEG (альтернативная сигнатура)
  return (
    uint8Array[0] === 0xff &&
    uint8Array[1] === 0xd8 &&
    uint8Array[2] === 0xff &&
    uint8Array[3] === 0xee
  )
}
