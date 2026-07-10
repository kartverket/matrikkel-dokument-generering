# Matrikkel Dokument Generering

Genererer PDF-dokumenter fra matrikkelrapporter (rapporttype `BYG0011`). Prosjektet
består av to deler:

- **React-app** for å bygge og forhåndsvise dokumentmalen.
- **API-server** som tar imot en byggrapport som JSON,
  renderer den til HTML og konverterer resultatet til PDF via
  [Gotenberg](https://gotenberg.dev/).

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

- Kjør React-appen (Vite dev-server): `bun run dev`
- Kjør linting (med og uten fiksing): `bun run lint:fix` og `bun run lint`
- Formatter prosjektet (med og uten endringer): `bun run format` og `bun run format:check`
- Bygg produksjonsartefakter (`dist/`): `bun run build`
- Forhåndsvis produksjonsbygg: `bun run preview`

### Formattering

Det er satt opp en pre-commit hook med Husky som sørger for at formattering
automatisk kjøres på alle commits.

## Kjøre API-serveren

API-serveren eksponerer `POST /create-document` som tar imot en byggrapport og
returnerer en PDF. Den er avhengig av at Gotenberg kjører.

1. **Start Gotenberg** (kjører på port `8089`). Gotenberg-tjenesten ligger i et
   eget repo, [pdf-generator](https://github.com/kartverket/pdf-generator).
   Klon det og start tjenesten med Docker Compose:

   ```sh
   git clone https://github.com/kartverket/pdf-generator.git
   cd pdf-generator
   docker compose up -d
   ```

2. **Start API-serveren:**

   ```sh
   bun run serve
   ```

   Serveren kjører da på [http://localhost:3000](http://localhost:3000)
   (eller porten satt i `PORT`).

3. **Test at den svarer:**

   ```sh
   curl http://localhost:3000/internal/isAlive        # -> OK

   curl -X POST http://localhost:3000/create-document \
     -H "Content-Type: application/json" \
     --data @rapport.json \
     --output rapport.pdf
   ```

### Miljøvariabler

| Variabel       | Standard                | Beskrivelse                              |
| -------------- | ----------------------- | ---------------------------------------- |
| `PORT`         | `3000`                  | Port API-serveren lytter på.             |
| `GOTENBERG_URL`| `http://0.0.0.0:8089`   | URL til Gotenberg-tjenesten.             |

## API-dokumentasjon (OpenAPI)

API-et er beskrevet i [`openapi.yaml`](./openapi.yaml).

Endepunkter:

| Metode | Sti                  | Beskrivelse                                            |
| ------ | -------------------- | ------------------------------------------------------ |
| `POST` | `/create-document`   | Validerer byggrapport og returnerer PDF (`application/pdf`).|
| `GET`  | `/internal/isAlive`  | Liveness-probe (returnerer `OK`).                      |
| `GET`  | `/internal/isReady`  | Readiness-probe (returnerer `OK`).                     |

Spesifikasjonen kan åpnes i en hvilken som helst OpenAPI-visning, for eksempel:

```sh
# Interaktiv dokumentasjon i nettleseren
bunx @redocly/cli preview-docs openapi.yaml

# Valider spesifikasjonen
bunx @redocly/cli lint openapi.yaml
```

## Docker

`Dockerfile` bygger og kjører API-serveren i produksjon. I containeren settes
`PORT=8087`.

```sh
docker build -t matrikkel-dokument-generering .
docker run -p 8087:8087 -e GOTENBERG_URL=http://host.docker.internal:8089 \
  matrikkel-dokument-generering
```
