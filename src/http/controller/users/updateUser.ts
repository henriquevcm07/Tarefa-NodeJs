import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcryptjs'

export async function updateUser(request: FastifyRequest, reply: FastifyReply){

    const userPayload = request.user as { sub: string, role: string }
    const { id: targetUserId } = request.params as { id: string }

    const userId = userPayload.sub
    const userRole = userPayload.role

    const isOwner = userId === targetUserId
    const isAdmin = userRole === 'admin'

    if (!isOwner && !isAdmin) {
    return reply.status(403).send({ message: 'Acesso negado.' })
    }

    const updateUserParamsSchema = z.object({
        name: z.string().trim().min(1).max(100).optional(), 
        password: z.string().min(8).max(100).optional(),
        email: z.unknown().optional()
    })
    const { name, password } = updateUserParamsSchema.parse(request.body)
    let dataToUpdate: { name?: string; password?: string } = {}
    if(name){
        dataToUpdate.name = name
    }
    if (password) {
        if(password.length <6){
            return reply.status(400).send({ message: 'A senha deve ter no mínimo 6 caracteres.' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        dataToUpdate.password = hashedPassword
    }

    const user = await prisma.user.update({
        where: {
            id: Number(targetUserId),
        },
            data: dataToUpdate,
    })
    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }

    return reply.status(200).send({user: userWithoutPassword, message: 'Usuário atualizado com sucesso.'})
}
