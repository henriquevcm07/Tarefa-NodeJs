import type { User } from '@/@types/prisma/client.js'

type HTTPUser = {
  id: number
  name: string
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
}
// biome-ignore lint/complexity/noStaticOnlyClass:  presenter 
export class UserPresenter {
  static toHTTP(user: User): HTTPUser
  static toHTTP(users: User[]): HTTPUser[]
  static toHTTP(input: User | User[]): HTTPUser | HTTPUser[] {
    if (Array.isArray(input)) {
      return input.map((u) => UserPresenter.toHTTP(u))
    }

    return {
      id: input.id,
      name: input.name,
      email: input.email,
      role: input.role,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
