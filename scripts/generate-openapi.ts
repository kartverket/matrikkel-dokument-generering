import { stringify } from "yaml"
import { openApiDocument } from "../src/openapi"

const generatedNotice = `# Denne filen er automatisk generert av \`bun run generate:openapi\`.`

const yaml = stringify(openApiDocument, {
  lineWidth: 100,
  minContentWidth: 0,
})
const output = `${generatedNotice}${yaml}`
const outputPath = new URL("../openapi.yaml", import.meta.url)

if (Bun.argv.includes("--check")) {
  const current = await Bun.file(outputPath).text()

  if (current !== output) {
    console.error(
      "openapi.yaml er utdatert. Kjør `bun run generate:openapi` og sjekk inn endringen.",
    )
    process.exit(1)
  }

  console.log("openapi.yaml er oppdatert.")
} else {
  await Bun.write(outputPath, output)
}
