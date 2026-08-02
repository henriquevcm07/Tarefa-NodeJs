import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
    PORT:  z.coerce.number().int().min(0).max(65535).default(3333),
    HOST: z.string().default('0.0.0.0'),
    DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5432/mydb'),
    JWT_SECRET: z.string().min(1).default('secret-padrao-para-testes-e-ci'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.log('invalid environment variables', _env.error)
    throw new Error('invalid environment variables')
}
export const env = _env.data 