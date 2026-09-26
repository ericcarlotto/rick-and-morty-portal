FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/bff/package.json apps/bff/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/contract/package.json packages/contract/package.json
RUN npm ci

COPY apps/web apps/web
COPY packages/contract packages/contract

ARG BFF_ORIGIN=http://bff:3001
ENV BFF_ORIGIN=$BFF_ORIGIN

RUN npm run build --workspace @rick/web

EXPOSE 3000

CMD ["npm", "run", "start", "--workspace", "@rick/web", "--", "-H", "0.0.0.0", "-p", "3000"]
