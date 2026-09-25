# OpenDesk

Portal de chamados open source construído com Next.js 14 App Router, TypeScript, Prisma e Auth.js Credentials.

## Segurança local

Nunca publique `.env`, tokens, senhas ou dumps do banco. O arquivo `.gitignore` já exclui os arquivos de ambiente locais. Use `.env.example` somente como referência e gere valores próprios para cada ambiente.

## Rodando localmente

1. Instale Node.js 20+ e tenha um PostgreSQL disponível.
2. Copie `.env.example` para `.env` e preencha `DATABASE_URL`, `AUTH_SECRET`, `DEFAULT_AGENT_EMAIL` e `SEED_DEMO_PASSWORD`.
3. Use uma senha local forte com pelo menos 12 caracteres em `SEED_DEMO_PASSWORD`.
4. Instale e gere o Prisma:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

Abra `http://localhost:3000`. O seed cria `cliente@opendesk.local` e `ana@opendesk.local`, usando a senha definida somente no seu `.env` em `SEED_DEMO_PASSWORD`. Não reutilize essa senha em produção.

## Funcionalidades

- Cadastro e login com Auth.js Credentials e bcrypt.
- Middleware protege `/dashboard`.
- Chamados, mensagens, status e métricas com autorização por papel.
- Upload direto para Vercel Blob com token server-side, limite de 15 MB e tipos de imagem, PDF e Office.
- Layout responsivo com painel de detalhes que se torna uma seção móvel.

## Deploy na Vercel

Crie um projeto Vercel conectado ao repositório e configure `DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`, `BLOB_READ_WRITE_TOKEN` e `DEFAULT_AGENT_EMAIL` nas variáveis de ambiente. Use um PostgreSQL gerenciado (Vercel Postgres, Neon ou Supabase), rode as migrations com `npx prisma migrate deploy` e faça o deploy. O projeto usa apenas APIs serverless compatíveis com a Vercel.

Não execute o seed com credenciais demo em produção. Crie o usuário AGENT diretamente no banco ou execute o seed apenas com uma `SEED_DEMO_PASSWORD` temporária e remova essa variável depois.

## Avisos de produção

- Os arquivos enviados ao Vercel Blob usam URLs públicas nesta versão. Não envie documentos confidenciais sem tornar o bucket privado e implementar autorização de download.
- Para uso público, adicione rate limiting, verificação de e-mail, proteção contra spam e monitoramento.
- Se um secret for exposto, revogue-o imediatamente e gere outro. Alterar o nome no código não invalida o valor comprometido.

## Licença

Distribuído sob a licença MIT. Consulte [LICENSE](./LICENSE).
