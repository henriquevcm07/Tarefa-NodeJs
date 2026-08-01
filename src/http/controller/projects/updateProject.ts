import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function updateProject(request: FastifyRequest, reply: FastifyReply){
    const userPayload = request.user as { sub: string, role: string }
    if (userPayload.role !== 'admin') {
        return reply.status(403).send({ message: 'Acesso negado.' })
    }

    const targetProject =  request.params as { id: string }

    const updateProjectParamsSchema = z.object({
        name: z.string().trim().min(1).max(100).optional(),
        description: z.string().trim().max(500).optional(),
        status: z.enum(['active', 'completed', 'canceled']).optional()
    })
    const { name, description, status } = updateProjectParamsSchema.parse(request.body)
    
    let dataToUpdate: { name?: string; description?: string; status?: string } = {}

    if(name){
        dataToUpdate.name = name
    }
    if(description){
        dataToUpdate.description = description
    }
    if(status){
        dataToUpdate.status = status
    }

    const project = await prisma.project.update({
        where: {
            id: Number(targetProject.id),
        },
        data: dataToUpdate
    })

    const projectResponse = {
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
    }
    return reply.status(200).send({project: projectResponse, message: 'Projeto atualizado com sucesso.'})
}