import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middleware/verify-jwt.js'
import { deleteUser } from './delete-user.js'
import { getUser } from './get-user.js'
import { listUsers } from './list-users.js'
import { listUserTasks } from './list-usertasks.js'
import { updateUser } from './update-user.js'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', { onRequest: [verifyJwt] }, listUsers)
  app.get('/:id', { onRequest: [verifyJwt] }, getUser)
  app.put('/:id', { onRequest: [verifyJwt] }, updateUser)
  app.delete('/:id', { onRequest: [verifyJwt] }, deleteUser)
  app.get('/:id/tasks', { onRequest: [verifyJwt] }, listUserTasks)
}
