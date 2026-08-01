import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function getProject(request: FastifyRequest, reply: FastifyReply){
    const { id: projectId } = request.params as { id: string }
    const project = await prisma.project.findUnique({
        where: {
            id: Number(projectId),
        },
    })
    if (!project) {
        return reply.status(404).send({ error: 'Projeto não encontrado' })
    }
    const projectResponse = {
        id: project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
    }
    return reply.status(200).send(projectResponse)
}