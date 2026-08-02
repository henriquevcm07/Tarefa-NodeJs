import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createTask(request: FastifyRequest, reply: FastifyReply){
    const userPayload = request.user as { sub: string, role: string }
    if (userPayload.role !== 'admin') {
        return reply.status(403).send({ message: 'Acesso negado.' })
    }
    const createTaskBodySchema = z.object({
        title: z.string().min(3).max(100),
        description: z.string().optional(),
        priority: z.enum(['low', 'medium', 'high']).default('medium'),
        deadline: z.coerce.date().optional(),
        projectId: z.coerce.number(),
    })
    
    const { title, description, priority, deadline, projectId } = createTaskBodySchema.parse(request.body)
    const projectExists = await prisma.project.findUnique({
        where: {
            id: Number(projectId),
        },
    })
    if (!projectExists) {
        return reply.status(404).send({ message: 'Projeto não encontrado.' })
    }
    const task = await prisma.task.create({
        data:{
            title,
            ...(description&&{ description }),
            priority,
            ...deadline&&{ deadline },
            projectId,
        }})
    
    return reply.status(201).send(task)
}