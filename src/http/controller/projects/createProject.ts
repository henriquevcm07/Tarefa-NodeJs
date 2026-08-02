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
        description: z.string().optional().transform((value) => value || null),
        status: z.enum(['active', 'completed', 'canceled']).default('active')
    })
    const result = createProjectBodySchema.safeParse(request.body)
    if (!result.success) {
        return reply.status(400).send({ message: 'Dados inválidos.'})
    }

    const { name, description, status } = result.data

    const project = await prisma.project.create({
        data:{
            name,
            description,
            status,
        }})
    const projectResponse = {
        id: project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
    }
        return reply.status(201).send(projectResponse)
}