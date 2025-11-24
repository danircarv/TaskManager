# Dockerfile multi-stage para NestJS 
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar apenas package.json e lock para instalar dependências de build
COPY package*.json ./
RUN npm ci

# Copiar o restante do código
COPY . .

# Gerar prisma client (se estiver usando Prisma)
# (não depende do DB para gerar)
RUN npx prisma generate

# Build da aplicação
RUN npm run build

# Produção
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Instala apenas dependências de produção
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar dist e assets do builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/main"]