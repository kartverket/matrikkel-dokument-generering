# Stage 1: Build
FROM dhi.io/bun:1.4.4-alpine3.24-dev@sha256:fb05b8b061db844af9e2ff18caa7f91c99e17144f2f982b9f0ae99783af57bbd AS builder

WORKDIR /srv

COPY . ./

RUN bun ci
RUN bun run build     # builds dist/
RUN bun build src/api/server.ts --outfile server.js --target bun --bundle

# Stage 2: Runtime
FROM dhi.io/bun:1.4.4-alpine3.24@sha256:109847d243a134c7fefc3f3d39d26c2b2080117b36149bb3b307de7ff81e9217 AS runtime

ENV USER_ID=65532 \
    TZ=Europe/Oslo \
    PORT=8087

WORKDIR /srv

COPY --from=builder --chown=${USER_ID}:${USER_ID} /srv/server.js ./server.js
COPY --from=builder --chown=${USER_ID}:${USER_ID} /srv/dist ./dist

USER ${USER_ID}

EXPOSE 8087

CMD ["bun", "server.js"]
