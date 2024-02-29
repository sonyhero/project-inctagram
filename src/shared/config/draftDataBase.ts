import Dexie, { Table } from 'dexie'

import { PostType } from '@/entities'

export type PostDataBaseType = Omit<PostType, 'imageUrl'> & { image: Blob }

export type DescriptionDataBaseType = { key: 'key'; currentDescription: string }

class PostsDB extends Dexie {
  posts!: Table<PostDataBaseType>
  description!: Table<DescriptionDataBaseType>

  constructor() {
    super('PostDataBase')
    this.version(1).stores({
      posts: 'id',
      description: 'key',
    })
  }
}

const postsDb = new PostsDB()

export const deletePostsDB = () => postsDb.delete()
//PostImages callbacks
export const clearPostsDB = () => postsDb.posts.clear()
export const putPostsDataToDB = (data: PostDataBaseType) => {
  postsDb.posts.put(data)
}
export const getPostsDataFromDB = () => postsDb.posts.toArray()

//PostIDescription callbacks
export const clearDescriptionDB = () => postsDb.description.clear()
export const putPostDescriptionDataToDB = (data: { currentDescription: string }) => {
  postsDb.description.put({ key: 'key', ...data })
}
export const getPostsDescriptionDataFromDB = () => postsDb.description.toArray()
