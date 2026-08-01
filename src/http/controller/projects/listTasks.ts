import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function listTasks(request: FastifyRequest, reply: FastifyReply){
    const { id } = request.params as { id: string }
    const targetProjectId = Number(id)

    const project = await prisma.project.findUnique({
        where: {
            id: targetProjectId,
        },
    })
    if (!project) {
        return reply.status(404).send({ message: 'Projeto não encontrado.' })
    }

    const tasks = await prisma.task.findMany({
        where: {
            projectId: targetProjectId,
        },
    })
    return reply.status(200).send(tasks)
}