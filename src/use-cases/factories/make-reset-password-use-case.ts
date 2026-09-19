import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { ResetPasswordUseCase } from '@/use-cases/users/user-reset-password.js'

export function makeResetPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new ResetPasswordUseCase(usersRepository)
}
