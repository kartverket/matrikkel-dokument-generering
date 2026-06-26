# Matrikkel Dokument Generering


## Oppsett

- Installer [bun](https://bun.com)
- Installer Node
- Installer avhengigheter: `bun install`

## Utvikling

- Kjør applikasjonen: `bun run dev`
- Kjør linting (med og uten fiksing): `bun run lint:fix` og `bun run lint`
- Formatter prosjektet (med og uten endringer): `bun run format` og `bun run format:check`

### Formattering

Det er satt opp en pre-commit hook med Husky som sørger for at formattering automatisk kjøres på alle commits.