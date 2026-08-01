import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function getTask(request: FastifyRequest, reply: FastifyReply){
    const { id: taskId } = request.params as { id: string }
    const task = await prisma.task.findUnique({
        where: {
            id: Number(taskId),
        },
        include: {
            tasksUsers: {
                select: {
                    userId: true,
                    user:{
                        select: {
                        name: true,     
                        email: true,
                        role: true,
                        }
                    }
                }
            },
        }
    })

    if (!task) {
        return reply.status(404).send({ error: 'Tarefa não encontrada' })
    }
    const taskResponse = {
        id: task.id,
        description: task.description,
        priority: task.priority,
        completed: task.completed,
        deadline: task.deadline,
        projectId: task.projectId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        assignedUsers: task.tasksUsers.map((taskUser) => ({
            Id: taskUser.userId,
            name: taskUser.user.name,
            email: taskUser.user.email,
            role: taskUser.user.role,
        })),
    }
    return reply.status(200).send(taskResponse)
}