import { MockPostsRepository } from '@/repositories/posts/mock-posts-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { SendDailyHighlightsUseCase } from '../messaging/send-daily-highlights.js'
import { makeSendEmailUseCase } from './make-send-email-use-case.js'

export function makeSendDailyHighlightsUseCase() {
  const postsRepository = new MockPostsRepository()
  const usersRepository = new PrismaUsersRepository()
  const sendEmailUseCase = makeSendEmailUseCase()
  return new SendDailyHighlightsUseCase(
    postsRepository,
    usersRepository,
    sendEmailUseCase,
  )
}
