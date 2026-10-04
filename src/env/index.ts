import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('production'),
  PORT: z.coerce.number().int().min(0).max(65535).default(3000),
  HOST: z.string().default('0.0.0.0'),

  DATABASE_URL: z
    .string()
    .default('postgresql://docker:docker@localhost:5432/tarefas?schema=public'),

  JWT_SECRET: z.string().min(1).default('secret-random-secret'),

  HASH_SALT_ROUNDS: z.coerce.number().optional(),
  CORS_ORIGIN: z.string().optional(),
  CRON_SCHEDULE: z.string().default('0 23 * * *'),
  EMAIL_USERNAME: z.email(),
  EMAIL_PASSWORD: z.string().min(1),

  FRONTEND_URL: z.string().default('http://localhost:3000'),
  APP_NAME: z.string().default('Tarefa Node'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('invalid environment variables', _env.error)
  throw new Error('invalid environment variables')
}

export const env = _env.data
