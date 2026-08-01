import type { FastifyInstance } from 'fastify';
import { listProjects } from './listProjects.js';
import { verifyJwt } from '@/http/middleware/verify-jwt.js';

export async function projectsRoutes(app: FastifyInstance){
        app.get('/', {onRequest: [verifyJwt]}, listProjects)
}