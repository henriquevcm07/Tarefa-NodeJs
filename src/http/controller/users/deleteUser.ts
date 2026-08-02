import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply){

    const userPayload = request.user as { sub: string, role: string }
    const { id: targetUserId } = request.params as { id: string }

    const userRole = userPayload.role

    const isAdmin = userRole === 'admin'

    if (!isAdmin) {
    return reply.status(403).send({ message: 'Acesso negado.' })
    }

    const user = await prisma.user.delete({
        where: {
            id: Number(targetUserId),
        },
    })
    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
    return reply.status(204).send(userWithoutPassword)
    }