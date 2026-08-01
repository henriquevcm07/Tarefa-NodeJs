import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function listTasks(request: FastifyRequest, reply: FastifyReply){
    const listTasksQuerySchema = z.object({
        completed: z.enum(['false', 'true']).optional().transform((val) => val === 'true'),
        priority: z.enum(['low', 'medium', 'high']).optional(),
        sort: z.string().optional(),
        order: z.enum(['asc', 'desc']).default('asc').optional(),
        })

    const { completed, priority, sort, order } = listTasksQuerySchema.parse(request.query)

    const where: any = {}
    if (completed !== undefined) {
        where.completed = completed
    }
    if (priority !== undefined) {
        where.priority = priority
    }
    let orderBy: any = {}
    if (sort) {
        orderBy[sort] = order
    }
    const tasks = await prisma.task.findMany({
        where,
        orderBy,
        })
    return reply.status(200).send(tasks)
    }
   
