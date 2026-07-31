import type { FastifyInstance } from 'fastify';
import { authRoutes } from './auth/auth.routes.js';

export async function appRoutes(app: FastifyInstance){
    app.register(authRoutes, { prefix: '/auth'  })
    
}