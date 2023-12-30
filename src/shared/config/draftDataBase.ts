import Dexie, { Table } from 'dexie'

import { PostType } from '@/entities'

export type PostDataBaseType = Omit<PostType, 'imageUrl'> & { image: Blob }

export type DescriptionDataBaseType = { currentDescription: string }

class PostsDB extends Dexie {
  posts!: Table<PostDataBaseType>

  constructor() {
    super('PostDataBase')
    this.version(1).stores({
      posts: 'id',
    })
  }
}

class DescriptionDB extends Dexie {
  description!: Table<DescriptionDataBaseType>

  constructor() {
    super('DescriptionDataBase')
    this.version(1).stores({
      description: 'currentDescription',
    })
  }
}

const postsDb = new PostsDB()

const descriptionDB = new DescriptionDB()

export const clearPostsDB = () => postsDb.posts.clear()
export const putPostsDataToDB = (data: PostDataBaseType) => {
  postsDb.posts.put(data)
}
export const getPostsDataFromDB = () => postsDb.posts.toArray()

export const clearDescriptionDB = () => descriptionDB.description.clear()
export const putPostDescriptionDataToDB = (data: { currentDescription: string }) => {
  descriptionDB.description.put(data)
}
export const getPostsDescriptionDataFromDB = () => descriptionDB.description.toArray()
