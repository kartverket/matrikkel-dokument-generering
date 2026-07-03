FROM oven/bun:1-alpine

ENV USER_ID=150 \
    USER_NAME=apprunner \
    TZ=Europe/Oslo \
    PORT=8087

RUN addgroup -g ${USER_ID} ${USER_NAME} \
    && adduser -u ${USER_ID} -G ${USER_NAME} -D ${USER_NAME}

WORKDIR /srv

COPY --chown=${USER_ID}:${USER_ID} dist ./dist
COPY --chown=${USER_ID}:${USER_ID} src ./src

USER ${USER_NAME}

EXPOSE 8087

CMD ["bun", "src/server.ts"]
