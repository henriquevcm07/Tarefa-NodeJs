import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcryptjs'

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
    return reply.status(200).send({user, message: 'Usuário deletado com sucesso.'})
    }