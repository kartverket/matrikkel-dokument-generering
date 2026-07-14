# Matrikkel Dokument Generering

Tjenesten tar imot en strukturert JSON, renderer den til HTML og konverterer resultatet til PDF via [Gotenberg](https://github.com/kartverket/pdf-generator).
API-serveren er bygget med [Hono](https://hono.dev/) på Bun.

Følgende rapporter støttes:
- BYG0011 - Byggrapport


## Relaterte repoer

Løsningen er delt over tre selvstendige repoer:

| Repo | Beskrivelse |
| ---- | ----------- |
| [matrikkel-dokument-generering](https://github.com/kartverket/matrikkel-dokument-generering) | Dette repoet |
| [pdf-generator](https://github.com/kartverket/pdf-generator) | Gotenberg-tjenesten (Docker-image) som API-serveren bruker til HTML→PDF. |
| [matrikkel-rapport-mock-server](https://github.com/kartverket/matrikkel-rapport-mock-server) | Mock-server som leverer eksempel-/testdata for matrikkelrapporter. |

## Oppsett

- Installer [Bun](https://bun.com)
- Installer Node
- Installer avhengigheter: `bun install`

## Utvikling

- Kjør klienten og API-serveren med hot reload: `bun run dev`
- Kjør linting (med og uten fiksing): `bun run lint:fix` og `bun run lint`
- Kjør tester: `bun run test`
- Formatter prosjektet (med og uten endringer): `bun run format` og `bun run format:check`
- Bygg produksjonsartefakter (`dist/`): `bun run build`
- Forhåndsvis produksjonsbygg: `bun run preview`

### Formattering

Det er satt opp en pre-commit hook med Husky som sørger for at formattering
automatisk kjøres på alle commits.

## Kjøre API-serveren

```zsh
bun run dev
```

API-serveren er avhengig av at Gotenberg kjører.

1. **Start Gotenberg** (se: [/kartverket/pdf-generator](https://github.com/kartverket/pdf-generator))

2. **Start klienten og API-serveren:**

   ```sh
   bun run dev
   ```

   - Klienten kjører på [http://localhost:5173](http://localhost:5173)
   - API-serveren kjører på [http://localhost:3000](http://localhost:3000)

3. **Test at den svarer:**

   ```sh
   curl http://localhost:3000/internal/isAlive        # -> Alive

   curl -X POST http://localhost:3000/create-document \
     -H "Content-Type: application/json" \
     --data @rapport.json \
     --output rapport.pdf
   ```

### Miljøvariabler

Miljøvariablene valideres ved oppstart i [`src/config/env.ts`](./src/config/env.ts).

| Variabel               | Standard              | Beskrivelse                       |
| ---------------------- | --------------------- | --------------------------------- |
| `PORT`                 | `3000`                | Port API-serveren lytter på.      |
| `GOTENBERG_URL`        | `http://0.0.0.0:8089` | URL til Gotenberg-tjenesten.      |
| `GOTENBERG_TIMEOUT_MS` | `10000`               | Tidsavbrudd mot Gotenberg i ms.   |

## API-dokumentasjon (OpenAPI)


Endepunkter:

| Metode | Sti                 | Beskrivelse                                                   |
| ------ | ------------------- | ------------------------------------------------------------- |
| `POST` | `/create-document`  | Validerer byggrapport og returnerer PDF (`application/pdf`).   |
| `GET`  | `/internal/isAlive` | Liveness-probe (returnerer `Alive`).                           |
| `GET`  | `/internal/isReady` | Readiness-probe (returnerer `Ready`).                          |
| `GET`  | `/internal/metrics` | Prometheus-metrikker for tjenesten.                       |
| `GET`  | `/openapi.json`     | Dynamisk generert OpenAPI-spesifikasjon.                  |
| `GET`  | `/docs`             | Interaktiv Swagger UI.                                    |



## Docker

`Dockerfile` bygger og kjører API-serveren i produksjon. I containeren settes
`PORT=8087`.

```sh
docker build -t matrikkel-dokument-generering .
docker run -p 8087:8087 -e GOTENBERG_URL=http://host.docker.internal:8089 \
  matrikkel-dokument-generering
```
