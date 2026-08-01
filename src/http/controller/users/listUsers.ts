import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function listUsers(_request: FastifyRequest, reply: FastifyReply){
    const users = await prisma.user.findMany()

    const usersWithoutPassword = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }))
    return reply.status(200).send(usersWithoutPassword)
}