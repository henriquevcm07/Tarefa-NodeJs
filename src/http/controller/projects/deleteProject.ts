import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteProject(request: FastifyRequest, reply: FastifyReply){

    const userPayload = request.user as { sub: string, role: string }
    const { id: targetProjectId } = request.params as { id: string }

    if (userPayload.role !== 'admin') {
        return reply.status(403).send({ message: 'Acesso negado.' })
    }

    const project = await prisma.project.delete({
        where: {
            id: Number(targetProjectId),
        },
    })
    const projectResponse = {
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
    }
    return reply.status(204).send({project: projectResponse, message: 'Projeto deletado com sucesso.'})
}