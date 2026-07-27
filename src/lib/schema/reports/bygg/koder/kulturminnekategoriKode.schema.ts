import { z } from "@hono/zod-openapi"

const kulturminnekategoriKoder = [
  "E-ARK", // Arkeologisk enkeltminne
  "L-ARK", // Arkeologisk lokalitet
  "E-BYG", // Bygning
  "L-BVF", // Bebyggelse-Infrastruktur
  "E-KRK", // Kirke
  "L-KRK", // Kirkested
  "E-MAR", // Kulturminne under vann
  "E-TEK", // Teknisk/Industrielt minne
  "E-BER", // Bergkunst
  "E-FAR", // Fartøy
  "E-RUI", // Ruin (middelalder)
  "E-UTE", // Utomhuselement
] as const

// ref: KulturminnekategoriKode.java / kodeverk-kulturminne.xml
export const kulturminnekategoriKodeSchema = z
  .enum(kulturminnekategoriKoder)
  .meta({
    id: "KulturminnekategoriKode",
    description: `Hovedkategori et kulturminne tilhører.

Kategori gjenspeiler hovedsakelig en forvaltningsmessig inndeling av kulturminnene, i motsetning til hovedgruppe og funksjon som gjenspeiler tilknytninger til samfunnssektorer.

Koder:

\`\`\`
E-ARK: Arkeologisk enkeltminne
L-ARK: Arkeologisk lokalitet
E-BYG: Bygning
L-BVF: Bebyggelse-Infrastruktur
E-KRK: Kirke
L-KRK: Kirkested
E-MAR: Kulturminne under vann
E-TEK: Teknisk/Industrielt minne
E-BER: Bergkunst
E-FAR: Fartøy
E-RUI: Ruin (middelalder)
E-UTE: Utomhuselement
\`\`\``,
    example: "E-BYG",
  })

export type KulturminnekategoriKode = z.infer<
  typeof kulturminnekategoriKodeSchema
>
