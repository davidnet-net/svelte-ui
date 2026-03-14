FROM oven/bun:latest AS build

WORKDIR /app

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
RUN bun ci

COPY . .

RUN bun run build

FROM oven/bun:latest AS runtime

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

CMD ["node", "./build"]