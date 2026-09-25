# OpenDesk

Open source ticket portal built with Next.js 14 App Router, TypeScript, Prisma, and Auth.js Credentials.

## Local security

Never publish `.env` files, tokens, passwords, or database dumps. The `.gitignore` file already excludes local environment files. Use `.env.example` only as a reference and generate separate values for each environment.

## Running locally

1. Install Node.js 20+ and make sure PostgreSQL is available.
2. Copy `.env.example` to `.env` and fill in `DATABASE_URL`, `AUTH_SECRET`, `DEFAULT_AGENT_EMAIL`, and `SEED_DEMO_PASSWORD`.
3. Use a local password with at least 12 characters for `SEED_DEMO_PASSWORD`.
4. Install dependencies and set up Prisma:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

Open `http://localhost:3000`. The seed creates `cliente@opendesk.local` and `ana@opendesk.local`, using the password defined only in your local `.env` as `SEED_DEMO_PASSWORD`. Do not reuse this password in production.

## Features

- Registration and login with Auth.js Credentials and bcrypt.
- Middleware protection for `/dashboard`.
- Ticket, message, status, and metrics workflows with role-based authorization.
- Direct Vercel Blob uploads with server-side token handling, a 15 MB limit, and image, PDF, and Office file support.
- Responsive layout with a details panel that becomes a mobile section.

## Deploying to Vercel

Create a Vercel project connected to the repository and configure `DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`, `BLOB_READ_WRITE_TOKEN`, and `DEFAULT_AGENT_EMAIL` as environment variables. Use a managed PostgreSQL provider such as Vercel Postgres, Neon, or Supabase. Run migrations with `npx prisma migrate deploy`, then deploy the project. The application uses only serverless-compatible APIs.

Do not run the seed with demo credentials in production. Create the `AGENT` user directly in the database, or run the seed with a temporary `SEED_DEMO_PASSWORD` and remove the variable afterward.

## Production notes

- Files uploaded to Vercel Blob use public URLs in this version. Do not upload confidential documents without making the bucket private and implementing authorized downloads.
- For public use, add rate limiting, email verification, spam protection, and monitoring.
- If a secret is exposed, revoke it immediately and generate a replacement. Renaming a variable in the code does not invalidate a compromised value.

## License

Distributed under the MIT License. See [LICENSE](./LICENSE).
