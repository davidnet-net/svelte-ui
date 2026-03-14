FROM oven/bun AS base

WORKDIR /app

COPY package.json package-lock.json* ./
RUN bun ci

COPY . .

RUN bun run build

FROM oven/bun AS base

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

CMD ["node", "./build"]