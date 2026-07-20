import { z } from "@hono/zod-openapi"

const supportedLocales = ["nb", "nn"] as const

export const localeSchema = z.enum(supportedLocales).meta({
  id: "Locale",
  description: `
  Språk / målform for dokumentet. Støttede språk:  <br/>
  - Bokmål (\`nb\`)
  - Nynorsk (\`nn\`).
  `,
})

export type RapportLocale = z.infer<typeof localeSchema>
