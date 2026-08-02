import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function updateTask(request: FastifyRequest, reply: FastifyReply){
    const userPayload = request.user as { sub: string, role: string }
    if (userPayload.role !== 'admin') {
        return reply.status(403).send({ message: 'Acesso negado.' })
    }

    const { id: targetTaskId } = request.params as { id: string }
    const updateTaskParamsSchema = z.object({
        title: z.string().trim().min(3).max(100).optional(),
        description: z.string().trim().max(500).optional(),
        priority: z.enum(['low', 'medium', 'high']).optional(),
        deadline: z.coerce.date().optional(),
        completed: z.boolean().optional()
    })
    const { title, description, priority, deadline, completed } = updateTaskParamsSchema.parse(request.body)

    let dataToUpdate: { title?: string; description?: string; priority?: string; deadline?: Date; completed?: boolean } = {}

    if(title){
        dataToUpdate.title = title
    }
    if(description){
        dataToUpdate.description = description
    }
    if(priority){
        dataToUpdate.priority = priority
    }
    if(deadline){
        dataToUpdate.deadline = deadline
    }
    if(completed){
        dataToUpdate.completed = completed
    }

    const task = await prisma.task.update({
        where: {
            id: Number(targetTaskId),
        },
        data: dataToUpdate
    })

    return reply.status(200).send(task)
}