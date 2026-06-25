FROM dhi.io/caddy:2.11.3-debian13@sha256:f2472171f4df97b2320ff44deab1c25dbaac3e3a37a6d0d5e4bf3f952250ba89

COPY /dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

ENV TZ=Europe/Oslo
USER nonroot
EXPOSE 8086