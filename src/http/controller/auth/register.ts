import { z } from 'zod';
import { prisma } from '@/libs/prisma.js';
import { hash } from 'bcryptjs';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function register(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        name: z.string().trim().min(1).max(100), 
        email: z.email().max(100),
        password: z.string().min(6).max(100),
        role: z.enum(['admin', 'user']).default('user'),
    })

    const {name, email, password, role} = registerBodySchema.parse(request.body)

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword,
            role
        }})
    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
    return reply.status(201).send(userWithoutPassword)
}