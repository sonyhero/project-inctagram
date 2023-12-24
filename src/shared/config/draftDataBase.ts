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

export const db = new DB()
