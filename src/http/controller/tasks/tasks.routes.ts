import type { FastifyInstance } from 'fastify';
import { listTasks } from './listTasks.js';
import { verifyJwt } from '@/http/middleware/verify-jwt.js';
import { getTask } from './getTask.js';
import { createTask } from './createTask.js';
import { updateTask } from './updateTask.js';
import { deleteTask } from './deleteTask.js';
import { completeTask } from './completeTask.js';
import { assignTask } from './assign/assignTask.js';
import { unassignTask } from './assign/unassignTask.js';

export async function tasksRoutes(app: FastifyInstance){
        app.get('/', {onRequest: [verifyJwt]}, listTasks)
        app.get('/:id', {onRequest: [verifyJwt]}, getTask)
        app.post('/', {onRequest: [verifyJwt]}, createTask)
        app.put('/:id', {onRequest: [verifyJwt]}, updateTask)
        app.delete('/:id', {onRequest: [verifyJwt]}, deleteTask)
        app.patch('/:id/complete', {onRequest: [verifyJwt]}, completeTask)
        app.post('/:id/assign', {onRequest: [verifyJwt]}, assignTask)
        app.delete('/:id/assign/:userId', {onRequest: [verifyJwt]}, unassignTask)
}