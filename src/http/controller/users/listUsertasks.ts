import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function listUserTasks(request: FastifyRequest, reply: FastifyReply){

    const { userId } = request.params as {userId: string}
    const userExists = await prisma.user.findUnique({
        where: {
            id: Number(userId),
        },
    })
    if (!userExists) {
        return reply.status(404).send({ message: 'Usuário não encontrado.' })
    }
    const tasks = await prisma.task.findMany({
        where: {
            tasksUsers: {
                some: {
                    userId: Number(userId),
                }
            }
        },
        include: {
            tasksUsers: {
                include: { 
                    user: true,
                },
            }
        }
    })
    return reply.status(200).send(tasks)
}