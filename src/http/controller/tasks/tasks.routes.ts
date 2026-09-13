import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middleware/verify-jwt.js'
import { assignTask } from './assign/assign-task.js'
import { unassignTask } from './assign/unassign-task.js'
import { completeTask } from './complete-task.js'
import { createTask } from './create-task.js'
import { deleteTask } from './delete-task.js'
import { getTask } from './get-task.js'
import { listTasks } from './list-tasks.js'
import { updateTask } from './update-task.js'

export async function tasksRoutes(app: FastifyInstance) {
  app.get('/', { onRequest: [verifyJwt] }, listTasks)
  app.get('/:id', { onRequest: [verifyJwt] }, getTask)
  app.post('/', { onRequest: [verifyJwt] }, createTask)
  app.put('/:id', { onRequest: [verifyJwt] }, updateTask)
  app.delete('/:id', { onRequest: [verifyJwt] }, deleteTask)
  app.patch('/:id/complete', { onRequest: [verifyJwt] }, completeTask)
  app.post('/:id/assign', { onRequest: [verifyJwt] }, assignTask)
  app.delete('/:id/assign/:userId', { onRequest: [verifyJwt] }, unassignTask)
}
