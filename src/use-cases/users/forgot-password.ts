import { randomBytes } from 'node:crypto'
import type { User } from '@/@types/prisma/client.js'
import type { UserRepository } from '@/repositories/users-repository.js'
import { UserNotFoundForPasswordResetError } from '@/use-cases/errors/user-not-found-for-password-reset-error.js'

interface ForgotPasswordUseCaseRequest {
  email: string
}

type ForgotPasswordUseCaseResponse = {
  user: User
  token: string
}

const EXPIRES_IN_MINUTES = 15
const TOKEN_LENGTH = 32

export class ForgotPasswordUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    email,
  }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    const userExists = await this.usersRepository.findBy({ email })

    if (!userExists) {
      throw new UserNotFoundForPasswordResetError()
    }

    const passwordToken = randomBytes(TOKEN_LENGTH).toString('hex')
    const tokenExpiresAt = new Date(Date.now() + EXPIRES_IN_MINUTES * 60 * 1000)

    const user = await this.usersRepository.update(userExists.id, {
      passwordResetToken: passwordToken,
      passwordResetTokenExpiration: tokenExpiresAt,
    })

    return {
      user,
      token: passwordToken,
    }
  }
}
