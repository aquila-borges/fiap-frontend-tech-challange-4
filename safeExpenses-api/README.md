# safeExpenses-api

RESTful API built with NestJS and clean architecture principles.

## Goals

- Keep domain and use cases isolated from persistence technology.
- Use `json-server` today with minimal effort to replace it later (MongoDB, Firebase, etc.).
- Expose a complete CRUD for expenses.

## Architecture

```text
src/
  app.module.ts
  main.ts
  modules/
    expenses/
      application/
        dto/
        use-cases/
      domain/
        entities/
        repositories/
        tokens/
      infrastructure/
        http/
        persistence/json-server/
```

`domain` has the business contracts (ports).
`application` has the use cases.
`infrastructure` has adapters (HTTP and persistence).

## Expense document shape

```json
{
  "id": "uuid",
  "description": "Groceries",
  "category": "Food",
  "account": "Credit Card",
  "value": -55.9,
  "consolidated": false,
  "transactionDate": "2026-08-08T14:30:00.000Z",
  "createdAt": "2026-08-08T14:30:00.000Z",
  "updatedAt": "2026-08-08T14:30:00.000Z"
}
```

## Endpoints

- `GET /health` — returns `{ "status": "ok" }` — used by Docker health checks
- `POST /expenses`
- `GET /expenses`
- `GET /expenses/:id`
- `PATCH /expenses/:id`
- `DELETE /expenses/:id`

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Run API:

```bash
npm run start:dev
```

- API: `http://localhost:3000`
- JSON simulator URL expected by the API: `http://localhost:3001`

## Run with Docker

Build image:

```bash
npm run docker:build
```

Create shared network (once):

```bash
npm run docker:network:create
```

Run container (requires `safeexpenses-jsonserver-local` already running on `safeexpenses-net`):

```bash
npm run docker:run
```

Stop container:

```bash
npm run docker:stop
```

Remove network when done:

```bash
npm run docker:network:remove
```

- API: `http://localhost:3000`
- Health check: `http://localhost:3000/health`

## Swap json-server later

Only replace the class currently bound to `EXPENSES_REPOSITORY` in `ExpensesModule`.
The domain contracts and use cases remain unchanged.
