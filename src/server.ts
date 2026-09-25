import { app } from './app.js'
import { env } from './env/index.js'
import { setupTrendingPostsJob } from './jobs/trending-posts.js'

app
  .listen({
    host: env.HOST,
    port: env.PORT,
  })
  .then(() => {
    const url = `http://localhost:${env.PORT}`
    console.log(`HTTP Server running at ${url}`)

    setupTrendingPostsJob()
  })
  .catch((err) => {
    console.error('❌ Erro ao subir o servidor:', err)
    process.exit(1)
  })
