import { z } from 'zod';
import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { compare } from 'bcryptjs';

export async function login(request: FastifyRequest, reply: FastifyReply){
    const LoginBodySchema = z.object({
        email: z.email().max(100),
        password: z.string()
    })

    const {email, password} = LoginBodySchema.parse(request.body)

    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    
    if (!user) {
        return reply.status(401).send({ error: 'Credenciais inválidas' })
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
        return reply.status(401).send({ error: 'Credenciais inválidas' })
    }

    const token = await reply.jwtSign(
    {
      id: user.id,
      role: user.role, 
    },
    {
      sign: {
        sub: String(user.id), 
        expiresIn: '1d', 
      },
    }
  )

    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
    return reply.status(200).send({ token, user: userWithoutPassword })
    }
       
