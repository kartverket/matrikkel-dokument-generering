import { Paragraph } from "@kv-designsystem/react"
import { Fragment, createElement } from "react"
import type {
  ByggRapport,
  ByggRapportBygning as Bygning,
  ByggRapportEndring as Endring,
  ByggRapportEtasjeplan as Etasjeplan,
} from "../../../schema/byggRapportSchema"
import type { RapportLocale } from "../../../schema/rapportSchema"
import { formatArea } from "../../../utils/format"
import {
  columnTable,
  createReportStructure,
  repeatSection,
  section,
} from "../../core/blocks"
import type { ReportStructure } from "../../core/types"

type ByggRapportTexts = {
  bolig: string
  annet: string
  totalt: string
  bygning: string
  opprinneligBygg: string
  endring: string
  utenEndringskode: string
  etasjeplan: string
  etasje: string
  antallBoenheter: string
  bruksareal: string
  bruttoareal: string
}

const byggRapportTexts = {
  nb: {
    bolig: "Bolig",
    annet: "Annet",
    totalt: "Totalt",
    bygning: "Bygning",
    opprinneligBygg: "Opprinnelig bygg",
    endring: "Endring",
    utenEndringskode: "Uten endringskode",
    etasjeplan: "Etasjeplan",
    etasje: "Etasje",
    antallBoenheter: "Antall boenheter",
    bruksareal: "Bruksareal",
    bruttoareal: "Bruttoareal",
  },

  // TODO gå gjennom og dobbelt-sjekk at dette er riktig nynorsk
  nn: {
    bolig: "Bustad",
    annet: "Anna",
    totalt: "Totalt",
    bygning: "Bygning",
    opprinneligBygg: "Opphavleg bygg",
    endring: "Endring",
    utenEndringskode: "Utan endringskode",
    etasjeplan: "Etasjeplan",
    etasje: "Etasje",
    antallBoenheter: "Antall bueiningar",
    bruksareal: "Bruksareal",
    bruttoareal: "Bruttoareal",
  },
} satisfies Record<RapportLocale, ByggRapportTexts>

function renderArealFordeling(
  areal: Etasjeplan["bruksareal"],
  texts: ByggRapportTexts,
) {
  return createElement(
    Fragment,
    null,
    createElement(
      Paragraph,
      { "data-size": "sm" },
      `${texts.bolig}: ${formatArea(areal.bolig)}`,
    ),
    createElement(
      Paragraph,
      { "data-size": "sm" },
      `${texts.annet}: ${formatArea(areal.annet)}`,
    ),
    createElement(
      Paragraph,
      { "data-size": "sm" },
      `${texts.totalt}: ${formatArea(areal.totalt)}`,
    ),
  )
}

function createByggRapportStructure(
  texts: ByggRapportTexts,
): ReportStructure<ByggRapport> {
  return createReportStructure<ByggRapport>([
    repeatSection<ByggRapport, Bygning>({
      items: (report) => report.bygninger,
      getKey: (bygning) => bygning.bygningsnr,
      title: (bygning) =>
        `${texts.bygning} ${bygning.bygningsnr} – ${bygning.bygningstype.navn}`,
      blocks: [
        repeatSection<Bygning, Endring>({
          items: (bygning) => bygning.endringer,
          getKey: (endring) => `${endring.id}`,
          title: (endring) =>
            endring.lopenr === 0
              ? texts.opprinneligBygg
              : `${texts.endring} ${endring.lopenr} – ${endring.endringskode ?? texts.utenEndringskode}`,
          blocks: [
            section<Endring>({
              title: texts.etasjeplan,
              when: (endring) => endring.etasjeplan.length > 0,
              blocks: [
                columnTable<Endring, Etasjeplan>({
                  columns: [
                    { header: texts.etasjeplan, render: (row) => row.etasjeplan },
                    {
                      header: texts.etasje,
                      render: (row) => row.etasje,
                    },
                    {
                      header: texts.antallBoenheter,
                      render: (row) => row.antallBoenheter,
                    },
                    {
                      header: texts.bruksareal,
                      render: (row) =>
                        renderArealFordeling(row.bruksareal, texts),
                    },
                    {
                      header: texts.bruttoareal,
                      render: (row) =>
                        renderArealFordeling(row.bruttoareal, texts),
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
}

const byggRapportStructures = {
  nb: createByggRapportStructure(byggRapportTexts.nb),
  nn: createByggRapportStructure(byggRapportTexts.nn),
} satisfies Record<RapportLocale, ReportStructure<ByggRapport>>

export function getByggRapportStructure(locale: RapportLocale) {
  return byggRapportStructures[locale]
}
