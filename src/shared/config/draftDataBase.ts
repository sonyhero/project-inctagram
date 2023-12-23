import Dexie, { Table } from 'dexie'

import { SizeType } from '@/entities'
// table inteface
// export interface Student {
//   id?: number
//   name: string
//   rollNumber: number
// }
export class DB extends Dexie {
  // table name is student
  posts!: Table<{
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
  }>

  constructor() {
    super('myDatabase')
    this.version(1).stores({
      posts: 'id',
    })
  }
}

export const db = new DB()
