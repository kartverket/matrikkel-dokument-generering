# Stage 1: Build
FROM dhi.io/bun:1.4.5-alpine-dev@sha256:40353a34f094ee556d48c6830d656d29619ab184f1a709055fd1baa58e8c391d AS builder

WORKDIR /srv

COPY . ./

RUN bun ci
RUN bun run build     # builds dist/
RUN bun build src/api/server.ts --outfile server.js --target bun --bundle

# Stage 2: Runtime
FROM dhi.io/bun:1.4.5-alpine@sha256:de13301a2d83ee38fe6bd81e2f6dec95e157545a99b5907bb1e1d4b761abbf89 AS runtime

ENV USER_ID=65532 \
    TZ=Europe/Oslo \
    PORT=8087

WORKDIR /srv

COPY --from=builder --chown=${USER_ID}:${USER_ID} /srv/server.js ./server.js
COPY --from=builder --chown=${USER_ID}:${USER_ID} /srv/dist ./dist

USER ${USER_ID}

EXPOSE 8087

CMD ["bun", "server.js"]
