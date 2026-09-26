FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/bff/package.json apps/bff/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/contract/package.json packages/contract/package.json
RUN npm ci

COPY apps/bff apps/bff
COPY packages/contract packages/contract

ENV PORT=3001
EXPOSE 3001

CMD ["npx", "tsx", "--tsconfig", "apps/bff/tsconfig.json", "apps/bff/src/main.ts"]
