# Stage 1: Build
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["node", "dist/main"]