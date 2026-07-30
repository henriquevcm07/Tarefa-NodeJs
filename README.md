# Tarefa Node.js: API de Gerenciamento de Projetos

Implemente, dentro deste repositório, a API descrita no enunciado da tarefa (PDF em anexo na plataforma): 
gerenciamento de projetos, tarefas e usuários, com autenticação
JWT e controle de acesso baseado em papéis (RBAC: `admin` e `user`). O contrato exato de
rotas, payloads e códigos HTTP que sua API precisa seguir está em
**[`docs/CONTRATO_API.pdf`](docs/CONTRATO_API.pdf)**. Leia esse arquivo com atenção, é ele
que a correção automática usa como referência.

## Como rodar localmente

1. Copie `.env.example` para `.env` (o `docker-compose.yml` lê `POSTGRES_USER`,
   `POSTGRES_PASSWORD`, `POSTGRES_DB` e `POSTGRES_PORT` dele, então esse passo vem antes
   de subir o banco).
2. Suba o banco: `docker compose up -d`
3. Instale as dependências (`npm install`) e configure o Prisma (`prisma/schema.prisma`
   apontando para `env("DATABASE_URL")`).
4. Gere/aplique suas migrations com `npx prisma migrate dev`. **Commite a pasta
   `prisma/migrations/` gerada**, ela é aplicada automaticamente na avaliação via
   `npx prisma migrate deploy`.
5. Rode sua aplicação com `npm start`. Ela deve subir escutando na porta `3000` (ou na
   `PORT` definida no `.env`) e responder `GET /health` com `200` assim que estiver pronta.

## Como funciona a correção

Quando quiser ser avaliado, vá na aba **Actions** deste repositório, escolha o workflow
**Notificar Avaliacao** e clique em **Run workflow** (branch `main`). Isso avisa uma
rotina nossa, que busca seu código, sobe sua API (usando o mesmo Postgres via Docker)
contra uma suíte de testes que valida cada requisito do enunciado, e publica o resultado
diretamente no seu commit no GitHub: um **status** (✅/❌) e um **comentário** com o
checklist de quais requisitos passaram ou falharam, inclusive o que era esperado para
cada um passar.

A avaliação **não** roda sozinha a cada push, é por escolha sua, assim commits
intermediários/WIP não geram comentário nenhum. Dispare quando achar que está pronto (ou
quantas vezes quiser, para ver o que ainda falta).

O código dos testes em si não fica neste repositório nem é divulgado, o que você recebe
de volta é sempre o resultado (passou/falhou) e a descrição do requisito, nunca a
implementação do teste. Isso é intencional, o objetivo é que você valide sua solução
contra o contrato documentado, não contra os detalhes internos da suíte.

O resultado costuma aparecer no seu commit em poucos minutos, o tempo real depende de
quanto sua `npm install` + `prisma migrate deploy` + boot da API demoram no runner.

### Setup necessário (uma vez só, antes do primeiro disparo)

Para o disparo funcionar, faça duas coisas neste repositório assim que criá-lo a partir
do template:

1. **Adicione `INJunior` como colaborador**, com permissão de escrita:
   - Vá em **Settings → Collaborators → Add people**.
   - Digite `INJunior` e confirme o convite.
   - Isso vai ficar marcado como "Invitation pending" na lista de colaboradores, e é
     assim mesmo, ninguém precisa aceitar manualmente do outro lado. O convite é aceito
     automaticamente na primeira vez que você disparar uma avaliação. É assim que a
     correção consegue publicar o status e o comentário de volta no seu commit.
2. **Cadastre o secret `AVALIADOR_DISPATCH_TOKEN`**:
   - Vá em **Settings → Secrets and variables → Actions → New repository secret**.
   - Em **Name**, coloque exatamente `AVALIADOR_DISPATCH_TOKEN`.
   - Em **Secret**, cole o valor presente no arquivo token.txt, onde esse arquivo é encontrado na plataforma do moodle (não é senha de nada,
     só autoriza avisar a correção, não dá acesso a mais nada).
   - **Add secret**.

Sem isso, o disparo manual roda normalmente, mas o workflow `Notificar Avaliacao` não vai
conseguir avisar a correção. Ele avisa isso com um warning nos logs dele (aba
**Actions**), sem quebrar nada no seu repositório.

## Dúvidas

Em caso de dúvida sobre alguma regra de negócio, o PDF da tarefa é a fonte da verdade
sobre o *comportamento* esperado; o `CONTRATO_API.pdf` é a fonte da verdade sobre o
*formato* (rotas, payloads, status codes). Se algo parecer contraditório ou faltando,
fale com a gente.
