FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN rm -f tsconfig.build.tsbuildinfo && npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
