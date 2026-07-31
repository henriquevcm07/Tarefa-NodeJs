import fastify from 'fastify';
import { env } from '@/env/index.js';
import { appRoutes } from './http/controller/routes.js';
import fastifyJwt from '@fastify/jwt'; 

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})



app.register(appRoutes)