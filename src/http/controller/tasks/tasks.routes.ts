import type { FastifyInstance } from 'fastify';
import { listTasks } from './listTasks.js';
import { verifyJwt } from '@/http/middleware/verify-jwt.js';
import { getTask } from './getTask.js';

export async function tasksRoutes(app: FastifyInstance){
        app.get('/', {onRequest: [verifyJwt]}, listTasks)
        app.get('/:id', {onRequest: [verifyJwt]}, getTask)
}