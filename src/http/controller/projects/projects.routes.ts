import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middleware/verify-jwt.js'
import { createProject } from './create-project.js'
import { deleteProject } from './delete-project.js'
import { getProject } from './get-project.js'
import { listProjects } from './list-projects.js'
import { listTasks } from './list-tasks.js'
import { updateProject } from './update-project.js'

export async function projectsRoutes(app: FastifyInstance) {
  app.get('/', { onRequest: [verifyJwt] }, listProjects)
  app.get('/:id', { onRequest: [verifyJwt] }, getProject)
  app.post('/', { onRequest: [verifyJwt] }, createProject)
  app.put('/:id', { onRequest: [verifyJwt] }, updateProject)
  app.delete('/:id', { onRequest: [verifyJwt] }, deleteProject)
  app.get('/:id/tasks', { onRequest: [verifyJwt] }, listTasks)
}
