import type { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verify-jwt.js';
import { projectReport } from './projectReport.js';

export async function reportsRoutes(app: FastifyInstance){
    app.get('/projects', {onRequest: [verifyJwt]}, projectReport)}