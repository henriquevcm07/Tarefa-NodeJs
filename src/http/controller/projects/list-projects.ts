import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/libs/prisma.js'
import { redis } from '@/libs/redis.js'

export async function listProjects(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const CACHE_KEY = 'projects:all'

  const cachedProjects = await redis.get(CACHE_KEY)

  if (cachedProjects) {
    console.log('[Cache hit] - Servindo direto da memória ram')
    return reply.status(200).send(JSON.parse(cachedProjects))
  }

  const projects = await prisma.project.findMany()

  const projectsResponse = projects.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    status: project.status,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  }))

  await redis.set(CACHE_KEY, JSON.stringify(projectsResponse), 'EX', 60)

  return reply.status(200).send(projectsResponse)
}
