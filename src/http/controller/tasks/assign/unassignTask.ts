import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function unassignTask(request: FastifyRequest, reply: FastifyReply){
    const userPayload = request.user as { role: string }
    if (userPayload.role !== 'admin') {
        return reply.status(403).send({ message: 'Acesso negado.' })
    }
    const {id: targetTaskId} = request.params as { id: string }
    const { userId: targetUserId } = request.params as { userId: number }
    const taskUser = await prisma.taskUser.findFirst({
    where: {
        taskId: Number(targetTaskId),
        userId: Number(targetUserId),
    },
    })
    if (!taskUser) {
        return reply.status(404).send({ message: 'associação não encontrada.' })
    }
    
    await prisma.taskUser.delete({
        where: {
            id: taskUser.id,
        },
    })
    const updatedTask = await prisma.task.findUnique({
        where: {
            id: Number(targetTaskId),
        }, include: {
            tasksUsers: {
                include: {  
                    user: true,
                },
            }
        }
    })
    return reply.status(200).send(updatedTask )
}
