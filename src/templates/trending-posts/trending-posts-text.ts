export function trendingPostsTextTemplate(
  userName: string,
  posts: { title: string; likesCount: number }[],
) {
  return `Olá, ${userName}!
Aqui estão os posts mais populares das últimas 24 horas:

${posts
  .map(
    (post, index) =>
      `${index + 1}. ${post.title} - ${post.likesCount} curtidas`,
  )
  .join('\n')}`
}
