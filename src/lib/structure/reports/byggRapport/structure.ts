import type {
  ByggRapport,
  ByggRapportBygning as Bygning,
  ByggRapportEndring as Endring,
  ByggRapportEtasjeplan as Etasjeplan,
} from "../../../schema/byggRapportSchema"
import { formatArea } from "../../../utils/format"
import { createReportStructure, dataTable, repeatSection, section } from "../../core/blocks"

export const byggRapportStructure = createReportStructure<ByggRapport>([
  repeatSection<ByggRapport, Bygning>({
    items: (report) => report.bygninger,
    getKey: (bygning) => bygning.bygningsnr,
    title: (bygning) =>
      `Bygning ${bygning.bygningsnr} – ${bygning.bygningstype.navn}`,
    blocks: [
      repeatSection<Bygning, Endring>({
        items: (bygning) => bygning.endringer,
        getKey: (endring) => `${endring.id}`,
        title: (endring) =>
          endring.lopenr === 0
            ? "Opprinnelig bygg"
            : `Endring ${endring.lopenr} – ${endring.endringskode ?? "Uten endringskode"}`,
        blocks: [
          section<Endring>({
            title: "Etasjeplan",
            when: (endring) => endring.etasjeplan.length > 0,
            blocks: [
              dataTable<Endring, Etasjeplan>({
                columns: [
                  {
                    header: "Etasje",
                    render: (row) => `${row.etasje} – ${row.etasjeplan}`,
                  },
                  { header: "Boenheter", render: (row) => row.antallBoenheter },
                  {
                    header: "Bruksareal",
                    render: (row) => formatArea(row.bruksareal.totalt),
                  },
                  {
                    header: "Bruttoareal",
                    render: (row) => formatArea(row.bruttoareal.totalt),
                  },
                ],
                rows: (endring) => endring.etasjeplan,
                getKey: (row) => `${row.etasjeplan}-${row.etasje}`,
              }),
            ],
          }),
        ],
      }),
    ],
  }),
])
