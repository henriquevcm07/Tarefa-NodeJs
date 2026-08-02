import fastify from 'fastify'
import { env } from './env/index.js'
import { appRoutes } from './http/controller/routes.js'
import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

await app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
})

app.register(appRoutes)
