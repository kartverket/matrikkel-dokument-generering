FROM node:24-alpine

ENV USER_ID=150 \
    USER_NAME=apprunner \
    TZ=Europe/Oslo

RUN addgroup -g ${USER_ID} ${USER_NAME} \
    && adduser -u ${USER_ID} -G ${USER_NAME} -D ${USER_NAME}

COPY --chown=${USER_ID}:${USER_ID} /dist /srv

USER ${USER_NAME}


ENV PORT=8086
EXPOSE 8086