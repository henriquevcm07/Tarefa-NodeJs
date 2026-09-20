export function trendingPostsHtmlTemplate(userName: string, posts: { title: string; likesCount: number }[]) {
  return `
  <h1>Olá, ${userName}!</h1>
  <p>Aqui estão os posts mais populares das últimas 24 horas:</p>
<ul>
${posts
    .map((post, index) => `<li>${index + 1}. ${post.title} - ${post.likesCount} curtidas</li>`)
    .join('\n')}
</ul>
  `
}