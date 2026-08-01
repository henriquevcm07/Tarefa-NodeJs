import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function listProjects(_request: FastifyRequest, reply: FastifyReply){
    const projects = await prisma.project.findMany()
    return reply.status(200).send(projects)
}