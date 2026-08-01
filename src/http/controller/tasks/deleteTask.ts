import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteTask(request: FastifyRequest, reply: FastifyReply){

    const userPayload = request.user as { sub: string, role: string }
    const { id: targetTaskId } = request.params as { id: string }

    if (userPayload.role !== 'admin') {
        return reply.status(403).send({ message: 'Acesso negado.' })
    }

    const task = await prisma.task.findUnique({
    where: {
      id: Number(targetTaskId),
    },
  })
    if (!task) {
        return reply.status(404).send({ message: 'Tarefa não encontrada.' })
    }
    
    prisma.task.delete({
        where: {
            id: Number(targetTaskId),
        },
    })

    return reply.status(204).send({task: task, message: 'Tarefa deletada com sucesso.'})
}