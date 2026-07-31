import type { FastifyInstance } from 'fastify';
import { register } from './register.js';

export async function authRoutes(app: FastifyInstance){
    app.post('/register', register)
}