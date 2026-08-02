import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

export type FastifyErrorHandler = Parameters<FastifyInstance['setErrorHandler']>[0]

export const errorHandler: FastifyErrorHandler = (error, _request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Dados inválidos.',
        })
    }
    
    const customError = error as { statusCode?: number; message: string }
    if (typeof customError.statusCode === 'number') {
        return reply.status(customError.statusCode).send({
            message: customError.message,
        })
    }

    return reply.status(500).send({
    message: 'Internal server error.',
  })
}