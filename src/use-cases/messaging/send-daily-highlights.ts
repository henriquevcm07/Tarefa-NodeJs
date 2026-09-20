import type { PostsRepository } from '@/repositories/posts-repository.js'                                          
import type { UserRepository } from '@/repositories/users-repository.js'                                           
import type { SendEmailUseCase } from '@/use-cases/messaging/send-email.js'                                        
import { trendingPostsHtmlTemplate } from '@/templates/trending-posts/trending-posts-html.js'                      
import { trendingPostsTextTemplate } from '@/templates/trending-posts/trending-posts-text.js'                      
                                                                                                                       
export class SendDailyHighlightsUseCase {                                                                          
    constructor(                                                                                                     
    private postsRepository: PostsRepository,                                                                      
    private usersRepository: UserRepository,                                                                       
    private sendEmailUseCase: SendEmailUseCase,                                                                    
    ) {}                                                                                                             
                                                                                                                    
    async execute(): Promise<void> {                                                                                 
    // 1. Busca os posts mais curtidos nas últimas 24h                                                             
    const posts = await this.postsRepository.findTopLikedLast24Hours()                                            
                                                                                                                    
    if (posts.length === 0) {                                                                                      
        console.log('Nenhum post em destaque nas últimas 24h.')                                                      
        return                                                                                                       
    }                                                                                                              
                                                                                                                    
    // 2. Busca todos os usuários cadastrados                                                                      
    const users = await this.usersRepository.findAll()                                                             
                                                                                                                    
    // 3. Envia o e-mail para cada usuário                                                                         
    for (const user of users) {                                                                                    
        await this.sendEmailUseCase.execute({                                                                        
        to: user.email,                                                                                            
        subject: 'Destaques das últimas 24 horas 🚀',                                                              
        message: trendingPostsTextTemplate(user.name, posts),                                                      
        html: trendingPostsHtmlTemplate(user.name, posts),                                                         
        })                                                                                                           
    }                                                                                                              
    }                                                                                                                
}