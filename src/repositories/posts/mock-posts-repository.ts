import type { Post, PostsRepository } from '@/repositories/posts-repository.js'

export class MockPostsRepository implements PostsRepository {
  public items: Post[] = [
    {
      id: '1',
      title: 'Post de hoje top',
      likesCount: 100,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Post de hoje fraco',
      likesCount: 5,
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Post antigo',
      likesCount: 500,
      createdAt: new Date('2024-01-01'),
    },
  ]

  async findTopLikedLast24Hours(): Promise<Post[]> {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    return this.items
      .filter((post) => post.createdAt >= twentyFourHoursAgo)
      .sort((a, b) => b.likesCount - a.likesCount)
  }
}
