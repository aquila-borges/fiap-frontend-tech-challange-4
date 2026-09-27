# safeExpenses-web

Angular application (single app, no microfrontends) for the SafeExpenses platform, styled after the EA App dark mode identity.

## Architecture

```text
src/app/
  app.config.ts
  app.routes.ts
  app.ts / app.html / app.css   (shell layout: sidebar + main content)
  features/
    home/
    not-found/
    configurations/             (settings dialog placeholder)
    expenses/
      models/
      interfaces/
      services/
      use-cases/
      pages/                    (container/page component)
      components/               (expense-list, expense-actions, expense-filters)
```

## Run locally

```bash
npm install
npm run start
```

- App: `http://localhost:4200`
- Expects the SafeExpenses API at `http://localhost:3000` (see `src/environments/environment.ts`)

## Run with Docker

```bash
npm run docker:build
npm run docker:network:create
npm run docker:run
```

- App: `http://localhost:4200`
