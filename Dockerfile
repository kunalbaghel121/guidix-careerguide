# Production Dockerfile for Next.js app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* ./
RUN npm ci --prefer-offline --no-audit --progress=false
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Only copy necessary files for running
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/.env* ./
EXPOSE 3000
CMD ["npm", "start"]
