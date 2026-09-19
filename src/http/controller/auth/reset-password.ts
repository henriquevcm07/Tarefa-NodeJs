import type { FastifyReply, FastifyRequest } from 'fastify'
import { resetPasswordSchema } from '@/http/schemas/users/reset-password-schema.js'
import { makeResetPasswordUseCase } from '@/use-cases/factories/make-reset-password-use-case.js'

export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { token, password } = resetPasswordSchema.parse(request.body)

    const resetPasswordUseCase = makeResetPasswordUseCase()
    await resetPasswordUseCase.execute({ token, password })

    return reply.status(200).send({ message: 'Senha redefinida com sucesso' })
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'Token inválido ou expirado'
    ) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
