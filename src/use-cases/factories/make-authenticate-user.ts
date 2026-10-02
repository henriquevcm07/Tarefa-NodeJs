import { compare } from 'bcryptjs'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { AuthenticateUserUseCase } from '@/use-cases/users/authenticate-user.js'
import type { HashProvider } from '@/providers/hash-provider.js'
import type { TokenProvider } from '@/providers/token-provider.js'

export function makeAuthenticateUserUseCase(tokenProvider: TokenProvider) {
  const userRepository = new PrismaUsersRepository()

  const hashProvider: HashProvider = {
    compare: (plain, hash) => compare(plain, hash),
  }

  return new AuthenticateUserUseCase(
    userRepository,
    hashProvider,
    tokenProvider,
  )
}
