import type { FastifyInstance } from 'fastify';
import { listTasks } from './listTasks.js';
import { verifyJwt } from '@/http/middleware/verify-jwt.js';

export async function tasksRoutes(app: FastifyInstance){
        app.get('/listTasks', {onRequest: [verifyJwt]}, listTasks)
}