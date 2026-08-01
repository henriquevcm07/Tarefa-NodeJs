import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function listUsers(_request: FastifyRequest, reply: FastifyReply){
    const users = await prisma.user.findMany()
    return reply.status(200).send(users)
}