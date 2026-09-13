import type { FastifyInstance } from 'fastify'
import { login } from './login.js'
import { register } from './register.js'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/login', login)
}
