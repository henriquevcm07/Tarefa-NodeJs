import type { FastifyInstance } from 'fastify';
import { listProjects } from './listProjects.js';
import { verifyJwt } from '@/http/middleware/verify-jwt.js';
import { getProject } from './getProject.js';
import { createProject } from './createProject.js';
import { updateProject } from './updateProject.js';

export async function projectsRoutes(app: FastifyInstance){
        app.get('/', {onRequest: [verifyJwt]}, listProjects)
        app.get('/:id', {onRequest: [verifyJwt]}, getProject)
        app.post('/', {onRequest: [verifyJwt]}, createProject)
        app.put('/:id', {onRequest: [verifyJwt]}, updateProject)
}