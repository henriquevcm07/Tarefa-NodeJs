import type { FastifyInstance } from 'fastify';
import { listTasks } from './listTasks.js';
import { verifyJwt } from '@/http/middleware/verify-jwt.js';
import { getTask } from './getTask.js';
import { createTask } from './createTask.js';
import { updateTask } from './updateTask.js';
import { deleteTask } from './deleteTask.js';
import { finishTask } from './finishTask.js';
import { assignTask } from './assign/assignTask.js';

export async function tasksRoutes(app: FastifyInstance){
        app.get('/', {onRequest: [verifyJwt]}, listTasks)
        app.get('/:id', {onRequest: [verifyJwt]}, getTask)
        app.post('/', {onRequest: [verifyJwt]}, createTask)
        app.put('/:id', {onRequest: [verifyJwt]}, updateTask)
        app.delete('/:id', {onRequest: [verifyJwt]}, deleteTask)
        app.patch('/:id', {onRequest: [verifyJwt]}, finishTask)
        app.post('/:id/assign', {onRequest: [verifyJwt]}, assignTask)
}