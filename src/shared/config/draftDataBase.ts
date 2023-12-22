import Dexie, { Table } from 'dexie'

import { PostType } from '@/entities'
// table inteface
// export interface Student {
//   id?: number
//   name: string
//   rollNumber: number
// }
export class DB extends Dexie {
  // table name is student
  posts!: Table<PostType>

  constructor() {
    super('myDatabase')
    this.version(1).stores({
      posts: 'id',
    })
  }
}

export const db = new DB()
