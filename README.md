# Matrikkel Dokument Generering


## Oppsett

- Installer [bun](https://bun.com)
- Installer Node
- Installer avhengigheter: `bun install`

## Utvikling

- Kjør applikasjonen: `bun run dev`
- Kjør applikasjonen med mocks: `bun run dev:mock`
- Kjør linting (med og uten fiksing): `bun run lint:fix` og `bun run lint`
- Formatter prosjektet (med og uten endringer): `bun run format` og `bun run format:check`

### Formattering

Det er satt opp en pre-commit hook med Husky som sørger for at formattering automatisk kjøres på alle commits.

### Mock-modus

Frontenden kan kjøres i mock-modus som mocker ut hele APIet (se [mocks](./src/mocks)).
Mock-modus kan aktiveres på en av følgende måter:

- Opprett en `.env`-fil på rotnivå basert på [.env.template](./.env.template) og sett variabelen `VITE_USE_MOCK=true`. Kjør deretter opp applikasjonen med `bun run dev`
- Kjør kommandoen `bun run dev:mock` som setter korrekt miljøvariabel automatisk.
