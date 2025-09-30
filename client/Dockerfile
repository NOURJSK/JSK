FROM node:20-alpine AS base

WORKDIR /app

COPY package.json  ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:20-alpGF
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
