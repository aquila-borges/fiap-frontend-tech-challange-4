FROM node:20-alpine AS builder

WORKDIR /app

COPY packages /packages
WORKDIR /packages/angular-ui
RUN npm ci && npm run build

WORKDIR /app
COPY safeExpenses-web/package*.json ./
RUN npm ci

COPY safeExpenses-web/ .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/safeExpenses-web/browser /usr/share/nginx/html
COPY safeExpenses-web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
