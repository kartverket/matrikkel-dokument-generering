# Stage 1: Build
FROM oven/bun:1.4.2-alpine@sha256:d888c0ae6c86d7866ff10c5aafdd9077b36aee6455b33dd270fb93c0dd5cef6f AS builder

WORKDIR /srv

COPY . ./

RUN bun ci
RUN bun run build     # builds dist/
RUN bun build src/api/server.ts --outfile server.js --target bun --bundle

# Stage 2: Runtime
FROM oven/bun:1.4.2-alpine@sha256:d888c0ae6c86d7866ff10c5aafdd9077b36aee6455b33dd270fb93c0dd5cef6f

ENV USER_ID=150 \
    USER_NAME=apprunner \
    TZ=Europe/Oslo \
    PORT=8087

RUN addgroup -g ${USER_ID} ${USER_NAME} \
    && adduser -u ${USER_ID} -G ${USER_NAME} -D ${USER_NAME}

WORKDIR /srv

COPY --from=builder --chown=${USER_ID}:${USER_ID} /srv/server.js ./server.js
COPY --from=builder --chown=${USER_ID}:${USER_ID} /srv/dist ./dist

USER ${USER_NAME}

EXPOSE 8087

CMD ["bun", "server.js"]
