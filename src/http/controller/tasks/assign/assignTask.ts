import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function assignTask(request: FastifyRequest, reply: FastifyReply){
    const userPayload = request.user as { role: string }

    if (userPayload.role !== 'admin') {
        return reply.status(403).send({ message: 'Acesso negado.' })
    }

    const assignTaskBodySchema = z.object({
        userIds: z.array(z.number()).min(1),
    })
    const { userIds } = assignTaskBodySchema.parse(request.body)

    const {id: targetTaskId} = request.params as { id: string }

    const task = await prisma.task.findUnique({
        where: {
            id: Number(targetTaskId),
        },
    })
    if (!task) {
        return reply.status(404).send({ message: 'Tarefa não encontrada.' })
    }

    await prisma.taskUser.createMany({
        data: userIds.map((userId) => ({
            taskId: Number(targetTaskId),
            userId: userId,
        })),
        skipDuplicates: true,
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
    return reply.status(200).send(updatedTask)
}