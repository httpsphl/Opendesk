<div align="center">

<img src="app/icon.svg" width="64" height="64" alt="OpenDesk" />

# OpenDesk

**A modern, open source ticket portal for teams that support people.**

Next.js 14 · TypeScript · Prisma · Auth.js · Tailwind CSS

[![License: MIT](https://img.shields.io/badge/license-MIT-38bdf8.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-4f46e5?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-4f46e5?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-5-4f46e5?logo=prisma&logoColor=white)](https://www.prisma.io)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-38bdf8.svg)](#contributing)

[Features](#features) · [Quickstart](#quickstart) · [Configuration](#configuration) · [Deployment](#deploying-to-vercel) · [Tech stack](#tech-stack) · [Contributing](#contributing)

</div>

---

OpenDesk is a self-hostable support desk: customers open tickets, agents triage and respond, and everyone gets a clear, real-time view of what's open, in progress, or resolved. It ships with authentication, role-based dashboards, file attachments, metrics, and a light/dark UI out of the box — ready to fork, brand, and deploy as your own.

## Features

- 🔐 **Authentication** — email/password login and signup via Auth.js Credentials, with bcrypt-hashed passwords and a password-visibility toggle.
- 🎫 **Ticket workflows** — customers open tickets with a subject, category, priority, and description; agents update status (`OPEN` → `IN_PROGRESS` → `WAITING_FOR_USER` → `RESOLVED`/`CLOSED`) and reply in a threaded conversation.
- 👥 **Role-based access** — `USER`, `AGENT`, and `ADMIN` roles gate what each person can see and do, enforced at the data layer.
- 📎 **File attachments** — direct-to-Vercel-Blob uploads (up to 15 MB) with inline previews for images and video, and permission-checked deletion.
- 📊 **Metrics dashboard** — open/closed volume over time, average resolution time, and per-agent workload, powered by Recharts.
- 🎨 **Polished UI** — a cohesive design system with a gradient brand palette, Space Grotesk + Plus Jakarta Sans typography, subtle entrance animations, and full light/dark theming via `next-themes`.
- 📱 **Responsive by default** — the ticket detail view collapses its side panel into a mobile-friendly section; every page works from phone to desktop.
- ⚡ **Serverless-ready** — built entirely on APIs compatible with Vercel's edge and serverless runtimes.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 14](https://nextjs.org) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Database ORM | [Prisma](https://www.prisma.io) + PostgreSQL |
| Auth | [Auth.js](https://authjs.dev) (Credentials provider) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| File storage | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) |
| Charts | [Recharts](https://recharts.org) |
| Icons | [Phosphor Icons](https://phosphoricons.com) |

## Quickstart

**Prerequisites:** Node.js 20+ and a PostgreSQL database.

```bash
# 1. Clone and install
git clone https://github.com/httpsphl/Opendesk.git
cd Opendesk
npm install

# 2. Configure environment
cp .env.example .env
# fill in DATABASE_URL, AUTH_SECRET, DEFAULT_AGENT_EMAIL, SEED_DEMO_PASSWORD

# 3. Set up the database
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed

# 4. Run it
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The seed creates two demo accounts — `cliente@opendesk.local` (customer) and `ana@opendesk.local` (agent) — both using the password you set in `SEED_DEMO_PASSWORD`.

> **Never reuse the seed password, or commit `.env`, tokens, or database dumps.** `.gitignore` already excludes local env files; treat `.env.example` as a reference only.

## Configuration

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | PostgreSQL connection string. |
| `AUTH_SECRET` | ✅ | Long random value; must be set for every environment. `NEXTAUTH_SECRET` works as a legacy alias. |
| `NEXTAUTH_URL` | ✅ (prod) | The deployed URL, e.g. `https://your-app.vercel.app`. |
| `DEFAULT_AGENT_EMAIL` | ✅ | Email of the agent auto-assigned to new tickets. |
| `SEED_DEMO_PASSWORD` | dev only | Password for the seeded demo accounts — 12+ characters, never used in production. |
| `BLOB_READ_WRITE_TOKEN` | for attachments | From a **public** Vercel Blob store (starts with `vercel_blob_rw_`). Without it, uploads are disabled gracefully. |

## Deploying to Vercel

1. Import the repository into a new Vercel project.
2. Provision PostgreSQL (Vercel Postgres, Neon, Supabase, or any managed provider) and set `DATABASE_URL`.
3. Set `AUTH_SECRET`, `NEXTAUTH_URL`, and `DEFAULT_AGENT_EMAIL` for the deployment's environment.
4. Create a **public** Vercel Blob store under the project's Storage tab and add its `BLOB_READ_WRITE_TOKEN` to enable attachments — a **private** store will reject uploads, since the app expects publicly accessible file URLs.
5. Run `npx prisma migrate deploy` against your production database, then deploy.

Don't run the seed with demo credentials in production — create the first `AGENT` user directly in the database instead, or seed once with a temporary `SEED_DEMO_PASSWORD` and remove it afterward.

## Production notes

- Attachments are stored as **public** Vercel Blob URLs in this version. If you need confidential uploads, switch the store to private and add authorized, signed downloads.
- For public-facing deployments, add rate limiting, email verification, and abuse monitoring — none are included by default.
- If any secret leaks, rotate it immediately. Renaming an environment variable does not invalidate a compromised value.

## Contributing

Issues and pull requests are welcome. For anything non-trivial, please open an issue first to discuss the change. Run `npx tsc --noEmit` and `npm run build` before submitting a PR.

## License

Distributed under the MIT License. See [LICENSE](./LICENSE).
