# Matrikkel Dokument Generering

Tjenesten tar imot en strukturert JSON, renderer den til HTML og konverterer resultatet til PDF via [Gotenberg](https://github.com/kartverket/pdf-generator).
API-serveren er bygget med [Hono](https://hono.dev/) på Bun.

Følgende rapporter støttes:
- BYG0011 - Byggrapport


## Relaterte repoer

Løsningen er delt over to selvstendige repoer:

| Repo | Beskrivelse |
| ---- | ----------- |
| [matrikkel-dokument-generering](https://github.com/kartverket/matrikkel-dokument-generering) | Dette repoet (inneholder nå både API, klient og lokal mock-data). |
| [pdf-generator](https://github.com/kartverket/pdf-generator) | Gotenberg-tjenesten (Docker-image) som API-serveren bruker til HTML→PDF. |

**Lokal mock-data:** Test-fixtures og mock-server-logikk er nå integrert lokalt i [`src/mock/`](./src/mock/). Se [Lokal HTML-preview med mockdata](#lokal-html-preview-med-mockdata) for brukseksempler.

## Oppsett

- Installer [Bun](https://bun.com)
- Installer Node
- Installer avhengigheter: `bun install`

## Utvikling

- Kjør klienten og API-serveren med hot reload: `bun run dev`
- Kjør linting (med og uten fiksing): `bun run lint:fix` og `bun run lint`
- Kjør tester: `bun run test`
- Kjør visuelle regresjonstester: `bun run test:visual`
- Formatter prosjektet (med og uten endringer): `bun run format` og `bun run format:check`
- Bygg produksjonsartefakter (`dist/`): `bun run build`
- Forhåndsvis produksjonsbygg: `bun run preview`

### Lokal HTML-preview med mockdata

For å teste dokumentrendring i nettleseren (uten PDF-generering), bruk URL-mønsteret:

`/{RAPPORTKODE}/{test-case}`

Testcaser er definert i [`src/mock/preview-data.ts`](./src/mock/preview-data.ts). Eksempler:

- `http://localhost:5173/BYG0011/standard` - Alias for `bygg-32-341` (eneboliger)
- `http://localhost:5173/BYG0011/bygg-32-341` - Eneboliger - Hagan terrasse 15B
- `http://localhost:5173/BYG0011/bygg-42-221` - Stort anlegg - Rikshospitalet
- `http://localhost:5173/BYG0011/bygg-stasjonsveien-1` - Skole og garasjer
- `http://localhost:5173/BYG0011/bygg-slottsplassen-1` - Historisk bygg - Slottet
- `http://localhost:5173/BYG0011/bygg-109-8` - Bygg i arbeid
- `http://localhost:5173/BYG0011/bygg-alle-5` - Oversikt - alle 5 bygg (aggregert rapport)

I dev-modus proxier Vite denne URL-en til API-endepunktet `/preview/{RAPPORTKODE}/{test-case}?format=html`. Mock-data lastes og normaliseres mot BYG0011-skjemaet ved hver forespørsel.

API-endepunktet `/preview/` støtter begge output-formater:

- `?format=html` (standard) - HTML-preview i nettleser
- `?format=pdf` - PDF-generering via Gotenberg

### Visuelle regresjonstester (Playwright)

Prosjektet har Playwright-tester som tar snapshots av HTML-preview for BYG0011-caser.
Disse ligger i en egen mappe: `visual-tests/`.

- Kjør testene: `bun run test:visual`
- Oppdater snapshots etter en bevisst UI-endring: `bun run test:visual:update`

Visuelle regresjonstester kjøres også i CI (`Build and deploy`-workflow) og må passere før image bygges/pushes fra `main`.

Første baseline dekker disse casene:

- `bygg-32-341`
- `bygg-42-221`
- `bygg-stasjonsveien-1`
- `bygg-slottsplassen-1`
- `bygg-109-8`

Merk: Aggregert caset `bygg-alle-5` er ikke med i baseline fordi mock-data inkluderer dynamisk tidsstempel (`generertTidspunkt`) som kan gjøre snapshot-differ ustabile.

Dette gjelder både `/preview/{RAPPORTKODE}/{test-case}` og `/create-document/{RAPPORTKODE}` (POST med JSON-payload).

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
