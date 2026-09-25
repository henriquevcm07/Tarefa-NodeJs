export interface Post {
  id: string
  title: string
  likesCount: number
  createdAt: Date
}

export interface PostsRepository {
  findTopLikedLast24Hours(): Promise<Post[]>
}