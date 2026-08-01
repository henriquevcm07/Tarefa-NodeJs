import type { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verify-jwt.js';
import { listUsers } from './listUsers.js';

export async function usersRoutes(app: FastifyInstance){
        app.get('/listUsers', {onRequest: [verifyJwt]}, listUsers)
}