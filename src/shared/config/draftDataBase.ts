import Dexie, { Table } from 'dexie'

import { SizeType } from '@/entities'

export type PostDataBaseType = {
  name: string
  type: string
  size: number
  image: Blob
  id: string
  zoom: number[]
  sizeScale: SizeType
  width: number
  height: number
  filter: string
}

export class DB extends Dexie {
  posts!: Table<PostDataBaseType>

  constructor() {
    super('PostDataBase')
    this.version(1).stores({
      posts: 'id',
    })
  }
}

const db = new DB()

export const clearDB = () => db.posts.clear()
export const putDataToDB = (data: PostDataBaseType) => {
  db.posts.put(data)
}
export const getDataFromDB = () => db.posts.toArray()
