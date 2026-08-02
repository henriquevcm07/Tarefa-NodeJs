import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteProject(request: FastifyRequest, reply: FastifyReply){

    const userPayload = request.user as { sub: string, role: string }
    const { id: targetProjectId } = request.params as { id: string }

    if (userPayload.role !== 'admin') {
        return reply.status(403).send({ message: 'Acesso negado.' })
    }

    const project = await prisma.project.findUnique({
    where: {
      id: Number(targetProjectId),
    },
    include: {
      tasks: true,
    },
  })
    if (!project) {
        return reply.status(404).send({ message: 'Projeto não encontrado.' })
    }
    if (project.tasks.length > 0) {
        return reply.status(409).send({ message: 'Não é possível deletar um projeto que possui tarefas associadas.' })
    }
    
    prisma.project.delete({
        where: {
            id: Number(targetProjectId),
        },
    })

    const projectResponse = {
        id : project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
    }
    return reply.status(204).send(projectResponse)
}