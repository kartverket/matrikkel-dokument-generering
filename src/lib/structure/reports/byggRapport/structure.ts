import { Paragraph } from "@kv-designsystem/react"
import { Fragment, createElement } from "react"
import type {
  ByggRapport,
  ByggRapportBygning as Bygning,
  ByggRapportEndring as Endring,
  ByggRapportEtasjeplan as Etasjeplan,
} from "../../../schema/byggRapportSchema"
import { formatArea } from "../../../utils/format"
import {
  columnTable,
  createReportStructure,
  repeatSection,
  section,
} from "../../core/blocks"

function renderArealFordeling(areal: Etasjeplan["bruksareal"]) {
  return createElement(
    Fragment,
    null,
    createElement(
      Paragraph,
      { "data-size": "sm" },
      `Bolig: ${formatArea(areal.bolig)}`,
    ),
    createElement(
      Paragraph,
      { "data-size": "sm" },
      `Annet: ${formatArea(areal.annet)}`,
    ),
    createElement(
      Paragraph,
      { "data-size": "sm" },
      `Totalt: ${formatArea(areal.totalt)}`,
    ),
  )
}

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
              columnTable<Endring, Etasjeplan>({
                columns: [
                  { header: "Etasjeplan", render: (row) => row.etasjeplan },
                  {
                    header: "Etasje",
                    render: (row) => row.etasje,
                  },
                  {
                    header: "Antall boenheter",
                    render: (row) => row.antallBoenheter,
                  },
                  {
                    header: "Bruksareal",
                    render: (row) => renderArealFordeling(row.bruksareal),
                  },
                  {
                    header: "Bruttoareal",
                    render: (row) => renderArealFordeling(row.bruttoareal),
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
