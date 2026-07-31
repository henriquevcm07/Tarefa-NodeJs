import fastify from 'fastify';
import { appRoutes } from './http/controller/routes.js';

export const app = fastify()

app.register(appRoutes)