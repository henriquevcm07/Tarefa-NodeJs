import cron from 'node-cron'
import { env } from '@/env/index.js'
import { makeSendDailyHighlightsUseCase } from '@/use-cases/factories/make-send-daily-highlights-use-case.js'

export function setupTrendingPostsJob() {
    const scheduleTime = process.env.CRON_SCHEDULE || '0 23 * * *'
    cron.schedule(scheduleTime, async () => {
        console.log('Iniciando o envio de destaques diários...')
        try {
            const sendDailyHighlightsUseCase = makeSendDailyHighlightsUseCase()
            await sendDailyHighlightsUseCase.execute()
            console.log('Envio de destaques diários concluído com sucesso.')
        } catch (error) {
            console.error('Erro ao enviar destaques diários:', error)
        }
    })
}