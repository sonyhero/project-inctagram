import Dexie, { Table } from 'dexie'

import { PostType } from '@/entities'

export type PostDataBaseType = Omit<PostType, 'imageUrl'> & { image: Blob }

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
