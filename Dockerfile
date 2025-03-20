FROM oven/bun:latest AS base
RUN corepack enable
WORKDIR /app
COPY package.json ./package.json
COPY bun.lock ./bun.lock

FROM base AS dev-deps
RUN --mount=type=cache,id=bun,target=/root/.bun bun install --frozen-lockfile --ignore-scripts

FROM dev-deps AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/root/.bun pnpm install --frozen-lockfile --ignore-scripts --prod

FROM base AS builder
COPY --from=dev-deps /app/node_modules /app/node_modules
COPY . .
RUN bun run build

FROM base AS runner
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
EXPOSE 8080
CMD ["bun", "run", "start"]


