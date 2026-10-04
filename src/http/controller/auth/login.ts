import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error.js'
import { makeAuthenticateUserUseCase } from '@/use-cases/factories/make-authenticate-user.js'

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const LoginBodySchema = z.object({
    email: z.email().max(100),
    password: z.string(),
  })

  const { email, password } = LoginBodySchema.parse(request.body)

  try {
    const tokenProvider = {
      generate: async (payload: { id: number; role?: string }) => {
        return reply.jwtSign(
          { id: payload.id, role: payload.role },
          { sign: { sub: String(payload.id), expiresIn: '1d' } },
        )
      },
    }

    const authenticateUserUseCase = makeAuthenticateUserUseCase(tokenProvider)

    const { token, user } = await authenticateUserUseCase.execute({
      email,
      password,
    })

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    return reply.status(200).send({ token, user: userWithoutPassword })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
