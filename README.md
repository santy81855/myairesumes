This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

### Daily database health check

`vercel.json` schedules `/api/cron/database-health` daily at 12:00 UTC
(Vercel Hobby may run it at any time within that hour). The endpoint runs three
read-only `SELECT 1` queries through Prisma and logs success or failure. It does
not read or modify user data. This activity can help prevent Supabase Free plan
inactivity pauses, but does not guarantee that Supabase will keep the project active.

Before deploying, configure a random `CRON_SECRET` of at least 32 characters in
the project's Vercel **Production** environment variables. Vercel automatically
sends it as an `Authorization: Bearer …` header for scheduled requests. Missing
or incorrect credentials receive HTTP 401 without querying the database.

After deploying, open **Settings → Cron Jobs** in Vercel, confirm the job is
enabled, and run it once. HTTP 200 indicates a successful database check;
HTTP 503 indicates a database connection or query failure. Check the function
logs for `Database health check succeeded` or `Database health check failed`.
If Supabase is already paused, resume it in Supabase before running the check.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
