# safeExpenses-jsonServer

Standalone json-server used as a NoSQL simulator for safeExpenses-api.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start server:

```bash
npm run start
```

- URL: http://localhost:3001

## Run with Docker

Build image:

```bash
docker build -t safeexpenses-jsonserver .
```

Run container:

```bash
docker run --rm -p 3001:3001 safeexpenses-jsonserver
```
