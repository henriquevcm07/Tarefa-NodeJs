import type { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verify-jwt.js';
import { listUsers } from './listUsers.js';
import { getUser} from './getUser.js';

export async function usersRoutes(app: FastifyInstance){
        app.get('/', {onRequest: [verifyJwt]}, listUsers)
        app.get('/:id', {onRequest: [verifyJwt]}, getUser)
}