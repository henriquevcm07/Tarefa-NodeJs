import type { FastifyInstance } from 'fastify';
import { authRoutes } from './auth/auth.routes.js';
import { projectsRoutes } from './projects/projects.routes.js';
import { usersRoutes } from './users/users.routes.js';

export async function appRoutes(app: FastifyInstance){
    app.register(authRoutes, { prefix: '/auth'  })
    app.register(projectsRoutes, { prefix: '/projects' })
    app.register(usersRoutes, { prefix: '/users' })
}