import { describe, expect, it, vi } from 'vitest'
import type { HashProvider } from '@/providers/hash-provider.js'
import type { TokenProvider } from '@/providers/token-provider.js'
import type { UserRepository } from '@/repositories/users-repository.js'
import { AuthenticateUserUseCase } from './authenticate-user.js'

describe('AuthenticateUserUseCase', () => {
  it('deve retornar um token quando o email e a senha estiverem corretos', async () => {
    const fakeHashedPassword = 'hashed-password'
    const fakeToken = 'token-falso'
    const inputEmail = 'usuario@exemplo.com'
    const inputPassword = 'senha-exemplo'

    const fakeUser = {
      id: 1,
      name: 'Nome',
      email: inputEmail,
      password: fakeHashedPassword,
      role: 'user',
      passwordResetToken: null,
      passwordResetExpiresAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const userRepository: UserRepository = {
      findBy: vi.fn().mockResolvedValue(fakeUser),
      update: vi.fn(),
      findAll: vi.fn(),
    }

    const hashProvider: HashProvider = {
      compare: vi.fn().mockResolvedValue(true),
    }

    const tokenProvider: TokenProvider = {
      generate: vi.fn().mockResolvedValue(fakeToken),
    }

    const sut = new AuthenticateUserUseCase(
      userRepository,
      hashProvider,
      tokenProvider,
    )

    const response = await sut.execute({
      email: inputEmail,
      password: inputPassword,
    })

    expect(response.token).toBe(fakeToken)
    expect(userRepository.findBy).toHaveBeenCalledWith({
      email: inputEmail,
    })

    expect(hashProvider.compare).toHaveBeenCalledWith(
      inputPassword,
      fakeHashedPassword,
    )
  })
})
