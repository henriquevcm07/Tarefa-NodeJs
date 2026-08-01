import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createProject(request: FastifyRequest, reply: FastifyReply){
    const userPayload = request.user as { sub: string, role: string }

    if (userPayload.role !== 'admin') {
        return reply.status(403).send({ message: 'Acesso negado.' })
    }

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
    const projectResponse = {
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
    }
        return reply.status(201).send(projectResponse)
}