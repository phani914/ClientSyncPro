# ClientSync Pro Production Readiness

## Required Environment

Set these variables in the production runtime:

```bash
AUTH_EMAIL=admin@clientsync.pro
AUTH_PASSWORD=<strong-production-password>
AUTH_SECRET=<at-least-32-characters-random-secret>
```

`NEXTAUTH_SECRET` may be used instead of `AUTH_SECRET`. Production session
creation rejects missing or short secrets.

## Release Gate

Run the release verification before deployment:

```bash
npm run release:check
```

This runs linting, creates a production build, starts the app with `next start`,
and executes the integration suite against real HTTP routes.

## Runtime Command

Build and run with:

```bash
npm run build
npm run start
```

Next.js requires a Node.js server for this app because it uses Server Actions,
Route Handlers, and Proxy-based authentication.

## Health Check

Use this endpoint for uptime monitoring:

```text
GET /api/health
```

Expected response:

```json
{
  "data": {
    "service": "clientsync-pro",
    "status": "ok",
    "timestamp": "2026-06-29T00:00:00.000Z"
  }
}
```

## Security Headers

The app configures baseline headers in `next.config.ts`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

The Next.js `x-powered-by` header is disabled.

## Current Data Store

The API uses an in-memory store seeded from demo records. This is suitable for
UAT and prototype deployments, but production deployments that require durable
data must replace `src/lib/api-store.ts` with database or upstream service
calls before go-live.

## Deployment Checklist

- Confirm production environment variables are set.
- Run `npm run release:check`.
- Confirm `/api/health` returns `status: ok`.
- Confirm login, dashboard, and logout work in the deployed environment.
- Confirm protected routes redirect to `/` when unauthenticated.
- Confirm durable storage is connected if production data persistence is in
  scope.
- Confirm monitoring is pointed at `/api/health`.
