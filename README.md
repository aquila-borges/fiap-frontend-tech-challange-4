# fiap-frontend-tech-challange-4

SafeExpenses — expense registration platform.

## Apps

- `safeExpenses-web`: Angular application (single app, no microfrontends) — port `4200`
- `safeExpenses-api`: NestJS API — port `3000`
- `safeExpenses-jsonServer`: standalone json-server used as NoSQL simulator — port `3001`

## Run with Docker Compose

From the repository root:

```bash
docker compose up --build
```

Or using convenience scripts:

```bash
npm run compose:up
```

Available scripts at root:

- `npm run compose:up`
- `npm run compose:up:detached`
- `npm run compose:down`
- `npm run compose:logs`
- `npm run compose:config`

Services:

- Web: `http://localhost:4200`
- API: `http://localhost:3000`
- JSON Server: `http://localhost:3001`

Startup order enforced by health checks:

```
safeexpenses-jsonserver (healthy)
  └─ safeexpenses-api (healthy)
       └─ safeexpenses-web
```