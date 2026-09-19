import { z } from 'zod'
import { emailSchema } from '@/http/schemas/utils/email.js'

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>
