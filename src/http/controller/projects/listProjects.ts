import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function listProjects(_request: FastifyRequest, reply: FastifyReply){
    const projects = await prisma.project.findMany()

    const projectsResponse = projects.map(project => ({
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
    }))

    return reply.status(200).send(projectsResponse)
}