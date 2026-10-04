import type { User } from '@/@types/prisma/client.js'
import type { HashProvider } from '@/providers/hash-provider.js'
import type { TokenProvider } from '@/providers/token-provider.js'
import type { UserRepository } from '@/repositories/users-repository.js'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error.js'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserUseCaseResponse {
  user: User
  token: string
}

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashProvider: HashProvider,
    private tokenProvider: TokenProvider,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findBy({ email })

    if (!user) {
      throw new InvalidCredentialsError()
    }
    const doesPasswordMatch = await this.hashProvider.compare(
      password,
      user.password,
    )

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    const token = await this.tokenProvider.generate({
      id: user.id,
      role: user.role,
    })

    return {
      user,
      token,
    }
  }
}
