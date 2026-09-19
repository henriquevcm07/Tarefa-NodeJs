import type { SentMessageInfo } from 'nodemailer'
import nodemailer from 'nodemailer'
import { env } from '@/env/index.js'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_USERNAME,
    pass: env.EMAIL_PASSWORD,
  },
})

interface SendEmailRequest {
  to: string
  subject: string
  message: string
  html: string
}

export async function sendEmail({
  to,
  subject,
  message,
  html,
}: SendEmailRequest): Promise<SentMessageInfo> {
  try {
    const info = await transporter.sendMail({
      from: `"Suporte" <${env.EMAIL_USERNAME}>`,
      to,
      subject,
      text: message,
      html,
    })

    console.log(`[E-mail enviado] Para: ${to} | ID: ${info.messageId}`)
    return info
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error)
    throw error
  }
}
