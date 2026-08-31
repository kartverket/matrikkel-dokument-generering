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
- Kjør produksjons-modus lokalt (for å teste PDF-generering): `bun run serve`

### CSS-building

Prosjektet bruker Tailwind CSS v4. Når du endrer Tailwind-klasser i komponentene, må du kjøre:

```sh
bun run build:css
```

Dette oppdaterer `dist/document-styles.css` som brukes av PDF-genereringen. Server bruker alltid denne prebuilt CSS-en (bygger ikke dynamisk) for å sikre stabil performance under PDF-generering.

### Lokal HTML-preview og PDF-testing med mockdata

Prosjektet har en integrert preview-system for å teste dokumenter:

**Oversikt over alle rapporttyper:**
- `http://localhost:5173/preview` - Hovedmeny

**Scenarier for en rapporttype:**
- `http://localhost:5173/preview/BYG0011` - Liste over alle test-cases for BYG0011

**Individuell preview (HTML eller PDF):**
- `http://localhost:5173/preview/BYG0011/{test-case}?format=html` - HTML-preview
- `http://localhost:5173/preview/BYG0011/{test-case}?format=pdf` - PDF-generering

Test-cases er definert i [`src/mock/preview-data.ts`](./src/mock/preview-data.ts). Eksempler:

- `bygg-32-341` - Eneboliger - Hagan terrasse 15B
- `bygg-42-221` - Stort anlegg - Rikshospitalet
- `bygg-stasjonsveien-1` - Skole og garasjer
- `bygg-slottsplassen-1` - Historisk bygg - Slottet
- `bygg-109-8` - Bygg i arbeid
- `bygg-delt-eierskap` - Delt eierskap - demonstrerer tiltakshavere og hjemmelshavere
- `bygg-alle-5` - Oversikt - alle 5 bygg (aggregert rapport)

I dev-modus proxier Vite disse URL-ene til API-endepunktet på port 3000. Mock-data lastes og normaliseres mot BYG0011-skjemaet ved hver forespørsel.

**Testing av PDF-generering:**

For optimal testing av PDF-generering (som bruker `NODE_ENV=production` for mindre HTML), kjør:

```sh
bun run serve
```

Dette kjører server i production-modus på port 3000. Test da direkte på:
- `http://localhost:3000/preview/BYG0011/bygg-32-341?format=pdf`

### Visuelle regresjonstester (Playwright)

Prosjektet har Playwright-tester som tar snapshots av HTML-preview for BYG0011-caser.
Disse ligger i en egen mappe: `visual-tests/`.

Testoppsettet er stabilisert for tvers av maskiner/OS med fast locale/tidssone/skjermskala og en liten piksel-toleranse for renderer-forskjeller.

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

API-serveren er avhengig av at Gotenberg kjører.

### Utviklingsmodus (med hot reload)

```zsh
bun run dev
```

1. **Start Gotenberg** (se: [/kartverket/pdf-generator](https://github.com/kartverket/pdf-generator))

2. **Start klienten og API-serveren:**

   ```sh
   bun run dev
   ```

   - Klienten kjører på [http://localhost:5173](http://localhost:5173)
   - API-serveren kjører på [http://localhost:3000](http://localhost:3000) (dev-modus, React ikke optimalisert)

3. **Test at den svarer:**

   ```sh
   curl http://localhost:3000/internal/isAlive        # -> Alive

   curl -X POST http://localhost:3000/create-document/BYG0011 \
     -H "Content-Type: application/json" \
     --data @rapport.json \
     --output rapport.pdf
   ```

### Produksjonsmodus (for PDF-testing)

For å teste PDF-generering som den kjører i produksjon (med `NODE_ENV=production` for optimalisert React output):

```sh
bun run serve
```

Dette:
1. Bygger CSS (`npm run build:css`)
2. Kjører server med `NODE_ENV=production` på port 3000
3. Test PDF-generering via: `http://localhost:3000/preview/BYG0011/bygg-32-341?format=pdf`

### Miljøvariabler

Miljøvariablene valideres ved oppstart i [`src/config/env.ts`](./src/config/env.ts).

| Variabel               | Standard              | Beskrivelse                       |
| ---------------------- | --------------------- | --------------------------------- |
| `PORT`                 | `3000`                | Port API-serveren lytter på.      |
| `GOTENBERG_URL`        | `http://0.0.0.0:8089` | URL til Gotenberg-tjenesten.      |
| `GOTENBERG_TIMEOUT_MS` | `30000`               | Tidsavbrudd mot Gotenberg i ms. (30s gir Gotenberg nok tid til HTML→PDF rendering) |

## API-dokumentasjon (OpenAPI)


Endepunkter:

| Metode | Sti                 | Beskrivelse                                                   |
| ------ | ------------------- | ------------------------------------------------------------- |
| `POST` | `/create-document/{rapportKode}` | Validerer rapport og returnerer PDF (`application/pdf`). Støttede koder: `BYG0011`. |
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
