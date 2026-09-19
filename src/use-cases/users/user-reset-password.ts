import bcrypt from 'bcryptjs'
import type { UserRepository } from '@/repositories/users-repository.js'

interface ResetPasswordUseCaseRequest {
  token: string
  password: string
}

export class ResetPasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    token,
    password,
  }: ResetPasswordUseCaseRequest): Promise<void> {
    const user = await this.userRepository.findBy({ passwordResetToken: token })
    if (!user) {
      throw new Error('Token inválido')
    }

    if (
      !user.passwordResetTokenExpiration ||
      new Date() > user.passwordResetTokenExpiration
    ) {
      throw new Error('Token inválido ou expirado')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await this.userRepository.update(user.id, {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetTokenExpiration: null,
    })
  }
}
