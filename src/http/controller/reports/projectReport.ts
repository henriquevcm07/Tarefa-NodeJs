import { prisma } from '@/libs/prisma.js';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function projectReport(request: FastifyRequest, reply: FastifyReply){
    const UserPayload = request.user as { role: string }

    if (UserPayload.role !== 'admin') {
        return reply.status(403).send({ message: 'Acesso negado.' })
    }

    const report =  await prisma.project.findMany({
      include: {
        tasks:{
            select: {
                completed: true,
                }   
            }  
        }
    })

    const response = report.map(project => {
        const totalTasks = project.tasks.length;
        const completedTasks = project.tasks.filter(task => task.completed).length;
        const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        return {
            projectId: project.id,
            projectName: project.name,
            totalTasks,
            completedTasks,
            completionPercentage: completionPercentage.toFixed(2) + '%'
        };
    })
    return reply.status(200).send(response)}