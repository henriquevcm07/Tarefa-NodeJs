import { sendEmail } from '@/utils/send-email.js'

interface SendEmailUseCaseRequest {
  to: string
  subject: string
  message: string
  html: string
}

export class SendEmailUseCase {
  async execute({ to, subject, message, html }: SendEmailUseCaseRequest) {
    return await sendEmail({ to, subject, message, html })
  }
}
