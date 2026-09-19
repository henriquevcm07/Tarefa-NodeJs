import type { Prisma, User } from '@/@types/prisma/client.js'

export interface UserRepository {
  findBy(where: Prisma.UserWhereUniqueInput): Promise<User | null>
  update(id: number, data: Prisma.UserUpdateInput): Promise<User>
}
