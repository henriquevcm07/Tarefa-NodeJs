import type { FastifyInstance } from 'fastify';
import { authRoutes } from './auth/auth.routes.js';
import { projectsRoutes } from './projects/projects.routes.js';
import { usersRoutes } from './users/users.routes.js';
import { tasksRoutes } from './tasks/tasks.routes.js';
import { reportsRoutes } from './reports/reports.route.js';

export async function appRoutes(app: FastifyInstance){
    app.register(authRoutes, { prefix: '/auth'  })
    app.register(projectsRoutes, { prefix: '/projects' })
    app.register(usersRoutes, { prefix: '/users' })
    app.register(tasksRoutes, { prefix: '/tasks' })
    app.register(reportsRoutes, { prefix: '/reports' })
    app.get('/health', async (request, reply) => {
    return reply.status(200).send({ status: 'ok' })
})
}