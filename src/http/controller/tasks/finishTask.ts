import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function finishTask(request: FastifyRequest, reply: FastifyReply){
    const userPayload = request.user as { sub: string, role: string }

    const { id: targetTaskId } = request.params as { id: string }
    const task = await prisma.task.findUnique({
        where: {
            id: Number(targetTaskId),
        },include:{
            tasksUsers: {
                select: {
                    userId: true
                }
            }
        }
    })
    if (!task) {
        return reply.status(404).send({ message: 'Tarefa não encontrada.' })
    }
    const currentUserId = Number(userPayload.sub)
    const isUserAssignedToTask = task.tasksUsers.some((taskUser) => taskUser.userId === currentUserId)

    if (userPayload.role !== 'admin' && !isUserAssignedToTask){
        return reply.status(403).send({ message: 'Acesso negado.' })
    }

    const updatedTask = await prisma.task.update({
        where: {
            id: Number(targetTaskId),
        },
        data: {
            completed: true
        }
    })
    return reply.status(200).send( task)}