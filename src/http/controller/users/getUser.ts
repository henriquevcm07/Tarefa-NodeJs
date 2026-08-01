import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getUser(request: FastifyRequest, reply: FastifyReply){
    const getIdParamsSchema = z.object({
        id: z.coerce.number()
    })
    const { id } = getIdParamsSchema.parse(request.params)

    const user = await prisma.user.findUnique({
        where:{
            id
        }
    })
    if (!user) {
        return reply.status(404).send({ message: 'Usuário não encontrado' })
    }
    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
    return reply.status(200).send(userWithoutPassword)
}