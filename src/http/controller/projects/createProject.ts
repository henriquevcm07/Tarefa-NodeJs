import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createProject(request: FastifyRequest, reply: FastifyReply){

    const createProjectBodySchema = z.object({
        name: z.string().min(3).max(100),
        description: z.string().optional().transform((val) => val ?? null),
        status: z.enum(['active', 'completed', 'canceled']).transform((val) => val ?? null)
    })
    const { name, description, status } = createProjectBodySchema.parse(request.body)

    const project = await prisma.project.create({
        data:{
            name,
            description,
            status
        }})

        return reply.status(201).send(project)
}