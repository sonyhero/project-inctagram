import Dexie, { Table } from 'dexie'

import { PostType } from '@/entities'

export type PostDataBaseType = Omit<PostType, 'imageUrl'> & { image: Blob }
export class DB extends Dexie {
  // table name is student
  posts!: Table<PostDataBaseType>

  constructor() {
    super('myDatabase')
    this.version(1).stores({
      posts: 'id',
    })
  }
}

const db = new DB()

export const clearDB = () => db.posts.clear()
export const addDataToDB = (data: PostDataBaseType) => db.posts.add(data)
export const getDataFromDB = () => db.posts.toArray()
